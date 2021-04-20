import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
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
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  S3_BUCKET_INPUT,
  S3_BUCKET_OUTPUT,
} from '@env';

const access = new Credentials({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
});

const s3 = new S3({
  credentials: access,
  region: 'us-east-1',
  bucket: S3_BUCKET_INPUT,
  signatureVersion: 'v4',
});
const chunkArray = [];

export default class Transcribe extends Component {
  sound = null;
  state = {
    audioFile: '',
    fileId: '',
    recording: false,
    loaded: false,
    paused: true,
    transcript: '',
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
      chunkArray.push(chunk);
      // if first chunk just set the chunk otherwise append
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
      fileId: '',
    });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) {
      return;
    }
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    this.setState({audioFile, recording: false});

    await this.uploadFile();
    // transcribe keeps trying to start before the file finishes uploading so this is a hack ayyy lmao
    this.sleep(7000);
    await this.transcribeFile();
    this.sleep(1000);
    await this.waitForTranscription();
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

  uploadFile = async () => {
    // uuid() not working on simulator known error with crypto not supported
    const fileId =
      'audioFile' + (Math.floor(Math.random() * 100000) + 1).toString();
    this.setState({fileId: fileId});

    // reads the file into memory and then converts it into binary buffer
    const content = await RNFS.readFile(this.state.audioFile, 'base64');
    const buff = Buffer.from(content, 'base64');
    //uploads file to aws s3 instance
    s3.putObject(
      {
        Bucket: S3_BUCKET_INPUT,
        Key: fileId + '.wav',
        Body: buff,
      },
      function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log('Upload to s3 successful.');
        }
      },
    );
  };

  transcribeFile = async () => {
    var uri =
      's3://' +
      S3_BUCKET_INPUT.toString() +
      '/' +
      this.state.fileId.toString() +
      '.wav';
    uri = uri.toString();
    console.log(uri);
    const transcribeService = new AWS.TranscribeService({
      credentials: access,
      region: 'us-east-1',
    });
    const params = {
      TranscriptionJobName: this.state.fileId,
      Media: {
        MediaFileUri: uri,
      },
      MediaFormat: 'wav',
      OutputBucketName: S3_BUCKET_OUTPUT,
      LanguageCode: 'en-US',
    };
    console.log('created client');
    await transcribeService.startTranscriptionJob(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        console.log('Started transcription.'); // successful response
      }
    });
  };

  waitForTranscription = async () => {
    // waits for the transcription job to finish and the object to exist
    s3.waitFor(
      'objectExists',
      {
        Bucket: S3_BUCKET_OUTPUT,
        Key: this.state.fileId + '.json',
      },
      this.callbackDownload,
    );
  };

  callbackDownload = (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log('Downloaded json.');
      this.downloadTranscription();
      return;
    }
  };

  downloadTranscription = async () => {
    s3.getObject(
      {
        Bucket: S3_BUCKET_OUTPUT,
        Key: this.state.fileId + '.json',
      },
      this.callbackGetTranscript,
    );
  };

  callbackGetTranscript = (err, data) => {
    if (err) {
      console.log(err, err.stack);
      // an error occurred
    } else {
      var resp = JSON.parse(JSON.stringify(data['Body']));
      //convert array to json
      resp = JSON.parse(
        String.fromCharCode.apply(null, new Uint8Array(resp['data'])),
      );
      var transcripts = resp['results']['transcripts'][0]['transcript']
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .toLowerCase();
      var transcript_array = transcripts.split(' ');
      this.setState({transcript: transcripts});
    }
  };

  sleep = milliseconds => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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
        <View style={styles.column}>
          <Text style={styles.baseText}>{this.state.transcript}</Text>
          <Button title="Add To Pantry" />
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
