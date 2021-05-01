import { Buffer } from "buffer";

import { readFile } from "react-native-fs";
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
} from "react-native-permissions";

import { addTranscript } from "./db.utils";
import {
  s3,
  buckets,
  transcribeService,
} from "./aws.utils";

export const chunkArray = [];

export const checkPermission = async () => {
  // Check microphone permissions
  let perm = await check(PERMISSIONS.IOS.MICROPHONE);

  console.log(`Permission check: ${perm}`);

  // Check permission state
  if (perm === RESULTS.GRANTED) return;

  // Otherwise request permission from user
  await request(PERMISSIONS.IOS.MICROPHONE);
};

export const uploadFile = async (file) => {
  let fileId = `audioFile${Math.floor(Math.random() * 100000) + 1}`;

  // Reads the file into memory and then converts it into binary buffer
  const content = await readFile(file, "base64");

  const buff = Buffer.from(content, "base64");

  // Upload file to AWS S3 instance
  s3.putObject({
      Bucket: buckets.in,
      Key: fileId + ".wav",
      Body: buff,
    }, (err) => {
      console.log(err ? `${err}\n${err.stack}` : "Upload to S3 successful");
    },
  );

  return fileId;
};

export const transcribeFile = async (fileId) => {
  let uri = `s3://${buckets.in}/${fileId}.wav`;
  console.log(`S3 URI: ${uri}`);

  const transcribeParams = {
    TranscriptionJobName: fileId,
    Media: { MediaFileUri: uri },
    MediaFormat: "wav",
    OutputBucketName: buckets.out,
    LanguageCode: "en-US",
  };

  // Wait for audio file to exist in bucket
  s3.waitFor("objectExists", {
    Bucket: buckets.in,
    Key: `${fileId}.wav`,
  }, async err => {
    if (err) console.log(err, err.stack);
    else {
      await transcribeService.startTranscriptionJob(transcribeParams, err => {
        console.log(err ? `${err}\n${err.stack}` : "Started transcription");
      });
    }
  });
};

export const downloadTranscription = async (fileId, callback) => {
  s3.waitFor("objectExists", {
    Bucket: buckets.out,
    Key: `${fileId}.json`,
  }, err => {
    if (err) console.log(err, err.stack);
    else {
      s3.getObject({
        Bucket: buckets.out,
        Key: fileId + ".json",
      }, (err, data) => extractTranscript(err, data, callback));
    }
  });
};

const extractTranscript = (err, data, callback) => {
  if (err) console.log(err, err.stack);

  else {
    let res = JSON.parse(JSON.stringify(data["Body"]));

    // Convert job buffer to JSON
    res = JSON.parse(String.fromCharCode
      .apply(null, new Uint8Array(res["data"])));

    let transcript = res["results"]["transcripts"][0]["transcript"]
      .replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
      .toLowerCase();

    addTranscript(res.jobName, transcript);
    console.log(`Transcript: ${transcript}`);

    callback(transcript);
  }
};
