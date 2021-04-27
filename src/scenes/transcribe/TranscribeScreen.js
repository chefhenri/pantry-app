import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AudioRecord from "react-native-audio-record";
import Sound from "react-native-sound";

import {
  checkPermission,
  uploadFile,
  transcribeFile,
  downloadTranscription,
} from "../../utils/transcribe.utils";
import { Colors, IconButton } from "react-native-paper";
import styles from "../../styles/root.styles";

const chunkArray = [];

const TranscribeScreen = () => {
  const [transcript, setTranscript] = useState("");
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

    AudioRecord.init({ sampleRate: 32000, wavFile: "test.wav" });

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

  const start = () => {
    console.log("Recording...");

    setPlayback(prev => ({ ...prev, recording: true }));

    AudioRecord.start();
  };

  const stop = async () => {
    if (playback.recording) {
      setPlayback(prev => ({ ...prev, recording: false }));

      // Stop recording
      let audioFile = await AudioRecord.stop();

      // Transcribe tries to start before .wav finishes uploading
      let fileId = await uploadFile(audioFile);

      await transcribeFile(fileId);

      await downloadTranscription(fileId,
        (transcript) => setTranscript(transcript));

      let sound = new Sound(audioFile);

      console.log(sound);

      setAudio(prev => ({
        ...prev,
        audioFile: audioFile,
        fileId: fileId,
        sound: sound,
        loaded: true,
      }));
    }
  };

  const play = async () => {
    setPlayback(prev => ({ ...prev, paused: false }));

    Sound.setCategory("Playback");

    audio.sound.play(success => {
      console.log(success ?
        "Finished playing successfully" :
        "Playback failed: failed decoding audio");

      setPlayback(prev => ({ ...prev, paused: true }));
    });
  };

  const pause = () => {
    audio.sound.pause();
    setPlayback(prev => ({ ...prev, paused: true }));
  };

  return (
    <SafeAreaView style={styles.centerWrapper}>
      <IconButton
        icon="microphone"
        colors={Colors.red400}
        size={50}
      />
    </SafeAreaView>
  );
};

export default TranscribeScreen;
