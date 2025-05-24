'use client";';

import { useRef, useState } from "react";

import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

if (!publicKey || !urlEndpoint) {
  throw new Error("ImageKit configuration is missing required keys.");
}

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, token, expire } = data;

    return { signature, token, expire };
  } catch (error: any) {
    throw new Error("Error authenticating with ImageKit: " + error.message);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (pathFile: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err: any) => {
    console.error("Error uploading file:", err);
  };
  const onSuccess = (res: IKUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath);

    toast("OK", {
      className: "bg-green-500 text-white",
    });
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test.png"
      />

      <button
        className="upload-btn bg-dark-300"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
