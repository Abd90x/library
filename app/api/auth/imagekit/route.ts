import config from "@/lib/config";

import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

const {
  env: {
    imageKit: { publicKey, privateKey },
  },
} = config;

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
  });

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey,
  });
}
