import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { readFile } from "react-native-fs";
import { Credentials, S3 } from "aws-sdk";
import { Buffer } from "buffer";

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  S3_BUCKET_INPUT,
  S3_BUCKET_OUTPUT,
} from "@env";
import TranscribeService from "aws-sdk/clients/transcribeservice";

export const access = new Credentials({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
});

export const s3 = new S3({
  credentials: access,
  region: "us-east-1",
  bucket: S3_BUCKET_INPUT,
  signatureVersion: "v4",
});

export const buckets = {
  in: S3_BUCKET_INPUT,
  out: S3_BUCKET_OUTPUT,
};

export const chunkArray = [];

export const checkPermission = async () => {
  let perm = await check(PERMISSIONS.IOS.MICROPHONE);
  console.log(`Permission check: ${perm}`);
  if (perm === RESULTS.GRANTED) return;
  await request(PERMISSIONS.IOS.MICROPHONE);
};

export const uploadFile = async (file) => {
  let fileId = `audioFile${Math.floor(Math.random() * 100000) + 1}`;

  // setAudio(prev => ({ ...prev, fileId: fileId }));

  // Reads the file into memory and then converts it into binary buffer
  const content = await readFile(file, "base64");

  const buff = Buffer.from(content, "base64");

  // Upload file to AWS S3 instance
  s3.putObject({
      Bucket: buckets.in,
      Key: fileId + ".wav",
      Body: buff,
    }, (err) => {
      console.log(err ? `${err}\n${err.stack}` : "Upload to s3 successful");
    },
  );

  return fileId;
};

export const transcribeFile = async (file) => {
  let uri = `s3://${buckets.in}/${file}.wav`;
  console.log(`S3 URI: ${uri}`);

  const transcribeService = new TranscribeService({
    credentials: access,
    region: "us-east-1",
  });

  const params = {
    TranscriptionJobName: file,
    Media: { MediaFileUri: uri },
    MediaFormat: "wav",
    OutputBucketName: buckets.out,
    LanguageCode: "en-US",
  };

  console.log("Client created");

  await transcribeService.startTranscriptionJob(params,
    (err) => {
      console.log(err ? `${err}\n${err.stack}` : "Started transcription");
    });
};

export const waitForTranscription = async (file) => {
  // Wait for job to finish and object to exist
  let params = { Bucket: buckets.out, Key: `${file}.json` };
  s3.waitFor("objectExists", params, err => {

  });

  // s3.waitFor("objectExists", {
  //   Bucket: buckets.out,
  //   Key: file + ".json",
  // }, (err) => callbackDownload(err, file));
};

const downloadTranscription = async (file) => {
  let params = { Bucket: buckets.out, Key: `${file}.json` };
  s3.getObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      let data = data["Body"]["data"];
    }
  });

  // s3.getObject({
  //   Bucket: buckets.out,
  //   Key: file + ".json",
  // }, (err, data) => callbackGetTranscript(err, data));
};

// export const requestPermission = async () => {
//   let perm = await request(PERMISSIONS.IOS.MICROPHONE);
//   console.log(perm);
// };

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
