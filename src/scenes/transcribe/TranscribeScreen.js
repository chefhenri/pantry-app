import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import AudioRecord from "react-native-audio-record";
import Sound from "react-native-sound";
import { Colors, IconButton } from "react-native-paper";

import styles from "../../styles/root.styles";
import {
  checkPermission,
  uploadFile,
  transcribeFile,
  downloadTranscription,
} from "../../utils/transcribe.utils";

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

  const [icon, setIcon] = useState("microphone");

  // Initializes AudioRecord
  useEffect(async () => {
    await checkPermission();

    AudioRecord.init({ sampleRate: 32000, wavFile: "test.wav" });

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      chunkArray.push(chunk);
    });
  }, []);

  // Determines action based on icon state
  const handlePlayback = async () => {
    switch (icon) {
      case "microphone":
        start();
        break;
      case "stop":
        await stop();
        break;
      case "play":
        await play();
        break;
      case "pause":
        pause();
        break;
    }
  };

  // Starts recording
  const start = () => {
    console.log("Recording...");

    setPlayback(prev => ({ ...prev, recording: true }));
    setIcon("stop");

    AudioRecord.start();
  };

  // Stops recording
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

      setIcon("play");
    }
  };

  // Starts playback
  const play = async () => {
    setPlayback(prev => ({ ...prev, paused: false }));

    Sound.setCategory("Playback");

    setIcon("pause");

    audio.sound.play(success => {
      console.log(success ?
        "Finished playing successfully" :
        "Playback failed: failed decoding audio");

      setPlayback(prev => ({ ...prev, paused: true }));
      setIcon("play");
    });
  };

  // Stops playback
  const pause = () => {
    audio.sound.pause();
    setPlayback(prev => ({ ...prev, paused: true }));
    setIcon("play");
  };

  return (
    <SafeAreaView style={styles.centerWrapper}>
      <IconButton
        icon={icon}
        colors={Colors.red400}
        size={50}
        animated={true}
        onPress={() => handlePlayback()}
      />
    </SafeAreaView>
  );
};

export default TranscribeScreen;
