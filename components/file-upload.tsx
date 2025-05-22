import React, { useRef, useState } from "react";

import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
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
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const [progress, setProgress] = useState<number>(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",

    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",

    text: variant === "dark" ? "text-light-100" : "text-dark-500",
  };

  const onError = () => {
    toast.error(`${type} Upload Failed failed please try again`);
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success(`Your ${type} Uploaded Successfully`);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error(
          "File size too large please upload a file that is less than 20MB in size"
        );

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error(
          "File size too large please upload file that is less than 50MB in size"
        );
        return false;
      }
    }

    return true;
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn cursor-pointer px-2.5", styles.button)}
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
          className="object-contain shrink-0"
        />

        <p className={cn("text-base truncate", styles.placeholder)}>
          {placeholder}
        </p>

        {file && (
          <p className={cn("upload-filename truncate", styles.text)}>
            {file.filePath}
          </p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath!}
            path={file.filePath!}
            width={500}
            height={300}
            className="h-96 w-full rounded-xl"
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath!}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
