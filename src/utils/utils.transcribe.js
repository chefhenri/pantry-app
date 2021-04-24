import { Credentials, S3 } from "aws-sdk";

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  S3_BUCKET_INPUT,
  S3_BUCKET_OUTPUT,
} from "@env";

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

export const chunkArray = [];

export const buckets = {
  in: S3_BUCKET_INPUT,
  out: S3_BUCKET_OUTPUT,
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
