"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint
}) => {
  const fileType = value?.split(".").pop();

  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <CldUploadWidget onSuccess={handleUpload} uploadPreset="uc7kyp22">
      {({ open }) => {
        const onClick = () => {
          open();
        };

        return (
          <button
            type="button"
            onClick={onClick}
            className="bg-gray-200 p-2 rounded-md shadow-sm hover:bg-gray-300"
          >
            Upload a File
          </button>
        );
      }}
    </CldUploadWidget>
  );
};
