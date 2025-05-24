import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("ImageKit configuration is missing required keys.");
}

const imagekit = new ImageKit({
  publicKey: publicKey as string,
  privateKey: privateKey as string,
  urlEndpoint: urlEndpoint as string,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
