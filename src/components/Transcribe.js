import React, { Component } from "react";

import Sound from "react-native-sound";
import { readFile } from "react-native-fs";
import Permissions from "react-native-permissions";
import AudioRecord from "react-native-audio-record";

import { Buffer } from "buffer";

import { access, s3, chunkArray, buckets } from "../utils/utils.transcribe";

export default class Transcribe extends Component {
  sound = null;
  state = {
    audioFile: "",
    fileId: "",
    recording: false,
    loaded: false,
    paused: true,
    transcript: "",
  };

  async componentDidMount() {

  }

  sleep = milliseconds => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    // return (
    //
    // );
  }
}
