import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth} from 'aws-amplify';
import {Buffer} from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import Amplify from 'aws-amplify';
import {S3, Credentials} from 'aws-sdk';
import TranscribeService from 'aws-sdk/clients/transcribeservice';
import * as RNFS from 'react-native-fs';
import {RNS3} from 'react-native-upload-aws-s3';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  S3_BUCKET,
} from '@env';

const access = new Credentials({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
});

const s3 = new S3({
  credentials: access,
  region: 'us-east-1',
  bucket: S3_BUCKET,
  signatureVersion: 'v4',
});

const chunkArray = [];

export default class Transcribe extends Component {
  sound = null;
  state = {
    audioFile: '',
    mybuffer: null,
    recording: false,
    loaded: false,
    paused: true,
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 32000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      //console.log('chunk size', chunk.length);
      chunkArray.push(data);
      // if first chunk just set the chunk otherwise append
      if (this.state.mybuffer == null) {
        this.setState({mybuffer: chunk});
      } else {
        this.setState({
          mybuffer: Buffer.concat(
            [this.state.mybuffer, chunk],
            this.state.mybuffer.length + chunk.length,
          ),
        });
      }
    });
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') {
      return;
    }
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({
      audioFile: '',
      recording: true,
      loaded: false,
      mybuffer: null,
    });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) {
      return;
    }
    console.log(AWS_ACCESS_KEY_ID);
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({audioFile, recording: false});
    // uuid() not working on simulator known error with crypto not supported
    const fileId =
      'audioFile' + (Math.floor(Math.random() * 100000) + 1).toString();
    console.log(fileId);
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: S3_BUCKET,
      Key: fileId + '.wav',
      ContentType: 'audio/wav',
      Expires: 60 * 15,
    });
    const data = RNFS.readFile(audioFile, 'base64'); // r is the path to the .wav file on the phone
    await fetch(url, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'audio/wav',
      },
    });

    const transcribeService = new AWS.TranscribeService({
      credentials: access,
      region: 'us-east-1',
    });
    const params = {
      TranscriptionJobName: fileId,
      Media: {
        MediaFileUri:
          'https://s3.amazonaws.com/' + S3_BUCKET + '/' + fileId + '.wav',
      },
      MediaFormat: 'wav',
      OutputBucketName: 'transcribe-output-swen514team5',
      LanguageCode: 'en-US',
    };
    console.log('created client');
    await new Promise((resolve, reject) => {
      transcribeService.startTranscriptionJob(params, function (err, data) {
        if (err) {
          reject(err);
        } // an error occurred
        else {
          console.log(data); // successful response
          resolve(data);
        }
      });
    });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({loaded: true});
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({paused: false});
    Sound.setCategory('Playback');

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({paused: true});
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({paused: true});
  };

  render() {
    const {recording, paused, audioFile} = this.state;
    return (
      <View>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
