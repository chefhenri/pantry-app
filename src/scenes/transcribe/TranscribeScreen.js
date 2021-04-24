import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import AudioRecord from "react-native-audio-record";
import { readFile } from "react-native-fs";
import Sound from "react-native-sound";

import * as AWS from "aws-sdk";
import { Buffer } from "buffer";

import {
  access,
  buckets,
  chunkArray,
  s3,
  sleep,
} from "../../utils/utils.transcribe";

const TranscribeScreen = () => {
  const [audio, setAudio] = useState({
    fileId: "",
    audioFile: "",
    transcript: "",
    sound: null,
    loaded: false,
  });
  const [playback, setPlayback] = useState({
    paused: true,
    recording: false,
  });

  useEffect(async () => {
    await checkPermission();

    AudioRecord.init({
      sampleRate: 32000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "test.wav",
    });

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      chunkArray.push(chunk);
    });
  }, []);
  useEffect(() => console.log(`Audio data updated: ${JSON.stringify(audio)}`), [audio]);
  useEffect(() => console.log(`Playback data updated: ${JSON.stringify(playback)}`), [playback]);

  const checkPermission = async () => {
    let perm = await check(PERMISSIONS.IOS.MICROPHONE);
    console.log(`Permission check: ${perm}`);
    if (perm === RESULTS.GRANTED) return;
    return requestPermission();
  };

  const requestPermission = async () => {
    let perm = await request(PERMISSIONS.IOS.MICROPHONE);
    console.log(perm);
  };

  const uploadFile = async () => {
    setAudio({
      fileId: `audioFile${Math.floor(Math.random() * 100000) + 1}`,
    });

    // Reads the file into memory and then converts it into binary buffer
    const content = await readFile(audio.audioFile, "base64");

    const buff = Buffer.from(content, "base64");

    // Uploads file to aws s3 instance
    s3.putObject({
        Bucket: buckets.in,
        Key: audio.fileId + ".wav",
        Body: buff,
      }, err => console.log(err ? `${err}\n${err.stack}` : "Upload to s3 successful"),
    );
  };

  const transcribeFile = async () => {
    let uri = `s3://${buckets.in}/${audio.fileId}.wav`;
    console.log(uri);

    const transcribeService = new AWS.TranscribeService({
      credentials: access,
      region: "us-east-1",
    });
    const params = {
      TranscriptionJobName: audio.fileId,
      Media: { MediaFileUri: uri },
      MediaFormat: "wav",
      OutputBucketName: buckets.out,
      LanguageCode: "en-US",
    };

    console.log("created client");

    await transcribeService.startTranscriptionJob(params,
      err => console.log(err ? `${err}\n${err.stack}` : "Started transcription"));
  };

  const waitForTranscription = async () => {
    // waits for the transcription job to finish and the object to exist
    s3.waitFor("objectExists", {
      Bucket: buckets.out,
      Key: audio.fileId + ".json",
    }, () => callbackDownload);
  };

  const callbackDownload = (err) => {
    console.log(err ? `${err}\n${err.stack}` : "Downloaded json");
    if (!err) downloadTranscription();
  };

  const downloadTranscription = async () => {
    s3.getObject({
      Bucket: buckets.out,
      Key: audio.fileId + ".json",
    }, () => callbackGetTranscript);
  };

  const callbackGetTranscript = (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      let res = data["Body"];
      //convert array to json
      res = JSON.parse(String
        .fromCharCode
        .apply(null, new Uint8Array(res["data"])));

      let transcripts = res["results"]["transcripts"][0]["transcript"]
        .replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
        .toLowerCase();

      // let transcript_array = transcripts.split(" ");

      setAudio({ transcript: transcripts });
    }
  };

  const start = () => {
    console.log("start record");
    setAudio({
      fileId: "",
      audioFile: "",
      loaded: false,
    });

    setPlayback({
      recording: true,
    });

    AudioRecord.start();
  };

  const stop = async () => {
    if (playback.recording) {
      setPlayback({ recording: false });
      console.log("stop record");

      let soundFile = await AudioRecord.stop();
      console.log(soundFile);

      setAudio({ audioFile: soundFile });

      // transcribe tries to start before the file finishes uploading
      await uploadFile();
      await sleep(7000);

      await transcribeFile();
      await sleep(1000);

      await waitForTranscription();
    }
  };

  const load = () => {
    return new Promise((resolve, reject) => {
      if (!audio.audioFile) {
        return reject("file path is empty");
      }

      this.sound = new Sound(audio.audioFile, "", err => {
        if (err) {
          console.log("failed to load the file", err);
          return reject(err);
        }
        setAudio({ loaded: true });
        // this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  const play = async () => {
    if (!audio.loaded) {
      try {
        await load();
      } catch (err) {
        console.log(err);
      }
    }

    setPlayback({ paused: false });
    Sound.setCategory("Playback");

    audio.sound.play(success => {
      console.log(success ? "Finished playing successfully" : "Playback failed - due to audio decoding errors");

      setPlayback({ paused: true });
    });
  };

  const pause = () => {
    audio.sound.pause();
    setPlayback({ paused: true });
  };

  return (
    <View>
      <View style={styles.row}>
        <Button onPress={start} title="Record" disabled={playback.recording} />
        <Button onPress={stop} title="Stop" disabled={!playback.recording} />
        {playback.paused ? (
          <Button onPress={play} title="Play" disabled={!audio.audioFile} />
        ) : (
          <Button onPress={pause} title="Pause" disabled={!audio.audioFile} />
        )}
      </View>
      <View style={styles.column}>
        <Text>{audio.transcript}</Text>
        <Button title="Add To Pantry" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default TranscribeScreen;
