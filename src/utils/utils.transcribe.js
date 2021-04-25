import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import TranscribeService from "aws-sdk/clients/transcribeservice";
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

const access = new Credentials({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
});

const s3 = new S3({
  credentials: access,
  region: "us-east-1",
  bucket: S3_BUCKET_INPUT,
  signatureVersion: "v4",
});

const buckets = {
  in: S3_BUCKET_INPUT,
  out: S3_BUCKET_OUTPUT,
};

export const checkPermission = async () => {
  let perm = await check(PERMISSIONS.IOS.MICROPHONE);
  console.log(`Permission check: ${perm}`);
  if (perm === RESULTS.GRANTED) return;
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

  const transcribeService = new TranscribeService({
    credentials: access,
    region: "us-east-1",
  });

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

    // console.log(`Object data: ${JSON.stringify(res)}`);

    let transcript = res["results"]["transcripts"][0]["transcript"]
      .replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
      .toLowerCase();

    console.log(`Transcript: ${transcript}`);

    callback(transcript);
  }
};
