import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import AudioRecord from "react-native-audio-record";
import { readFile } from "react-native-fs";
import Sound from "react-native-sound";

import { Buffer } from "buffer";
import TranscribeService from "aws-sdk/clients/transcribeservice";

import {
  access,
  s3,
  buckets,
  chunkArray,
  sleep,
  checkPermission, uploadFile, transcribeFile,
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

  useEffect(() => {
    console.log(`Audio data updated: ${JSON.stringify(audio)}`);
  }, [audio]);

  useEffect(() => {
    console.log(`Playback data updated: ${JSON.stringify(playback)}`);
  }, [playback]);

  // const checkPermission = async () => {
  //   let perm = await check(PERMISSIONS.IOS.MICROPHONE);
  //   console.log(`Permission check: ${perm}`);
  //   if (perm === RESULTS.GRANTED) return;
  //   return requestPermission();
  // };

  // const requestPermission = async () => {
  //   let perm = await request(PERMISSIONS.IOS.MICROPHONE);
  //   console.log(perm);
  // };

  // const uploadFile = async (file) => {
  //   let fileId = `audioFile${Math.floor(Math.random() * 100000) + 1}`;
  //
  //   setAudio(prev => ({ ...prev, fileId: fileId }));
  //
  //   // Reads the file into memory and then converts it into binary buffer
  //   const content = await readFile(file, "base64");
  //
  //   const buff = Buffer.from(content, "base64");
  //
  //   // Upload file to AWS S3 instance
  //   s3.putObject({
  //       Bucket: buckets.in,
  //       Key: fileId + ".wav",
  //       Body: buff,
  //     }, (err) => {
  //       console.log(err ? `${err}\n${err.stack}` : "Upload to s3 successful");
  //     },
  //   );
  //
  //   return fileId;
  // };

  // const transcribeFile = async (fileId) => {
  //   let uri = `s3://${buckets.in}/${fileId}.wav`;
  //   console.log(`S3 URI: ${uri}`);
  //
  //   const transcribeService = new TranscribeService({
  //     credentials: access,
  //     region: "us-east-1",
  //   });
  //
  //   const params = {
  //     TranscriptionJobName: fileId,
  //     Media: { MediaFileUri: uri },
  //     MediaFormat: "wav",
  //     OutputBucketName: buckets.out,
  //     LanguageCode: "en-US",
  //   };
  //
  //   console.log("Client created");
  //
  //   await transcribeService.startTranscriptionJob(params,
  //     (err) => {
  //       console.log(err ? `${err}\n${err.stack}` : "Started transcription");
  //     });
  // };

  // const waitForTranscription = async (fileId) => {
  //   // Wait for job to finish and object to exist
  //   s3.waitFor("objectExists", {
  //     Bucket: buckets.out,
  //     Key: fileId + ".json",
  //   }, (err) => callbackDownload(err, fileId));
  // };

  const callbackDownload = async (err, fileId) => {
    console.log(err ? `${err}\n${err.stack}` : "Downloaded json");
    if (!err) await downloadTranscription(fileId);
  };

  const downloadTranscription = async (fileId) => {
    s3.getObject({
      Bucket: buckets.out,
      Key: fileId + ".json",
    }, (err, data) => callbackGetTranscript(err, data));
  };

  const callbackGetTranscript = (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      let res = data["Body"];

      // Convert array to JSON
      res = JSON.parse(String
        .fromCharCode
        .apply(null, new Uint8Array(res["data"])));

      let transcripts = res["results"]["transcripts"][0]["transcript"]
        .replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
        .toLowerCase();

      setAudio(prev => ({ ...prev, transcript: transcripts }));
    }
  };

  const start = () => {
    console.log("start record");
    setAudio(prev => ({
      ...prev,
      fileId: "",
      audioFile: "",
      loaded: false,
    }));

    setPlayback(prev => ({
      ...prev,
      recording: true,
    }));

    AudioRecord.start();
  };

  const stop = async () => {
    if (playback.recording) {

      setPlayback(prev => ({ ...prev, playback: false }));

      // Stop recording
      let file = await AudioRecord.stop();

      setAudio(prev => ({ ...prev, audioFile: file }));

      // Transcribe tries to start before .wav finishes uploading
      let fileId = await uploadFile(file);
      // await sleep(7000);

      await transcribeFile(fileId);
      // await sleep(1000);

      await waitForTranscription(fileId);
    }
  };

  const load = () => {
    return new Promise((resolve, reject) => {
      if (!audio.audioFile) {
        return reject("File path is empty");
      }

      let sound = new Sound(audio.audioFile, "",
        err => console.log("Failed to load the sound file", err));

      setAudio(prev => ({
        ...prev,
        loaded: true,
        sound: sound,
      }));
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

    setPlayback(prev => ({ ...prev, paused: false }));
    Sound.setCategory("Playback");

    audio.sound.play(success => {
      console.log(success ?
        "Finished playing successfully" :
        "Playback failed - due to audio decoding errors");

      setPlayback(prev => ({ ...prev, paused: true }));
    });
  };

  const pause = () => {
    audio.sound.pause();
    setPlayback(prev => ({ ...prev, paused: true }));
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
        <Button
          title="Add To Pantry"
          onPress={() => console.log("Placeholder: add items to pantry")}
        />
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
