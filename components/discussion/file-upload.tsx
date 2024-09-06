"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { FileText, Trash } from 'lucide-react';

interface FileUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url); // Update with the secure URL of the uploaded file
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="z-99">
      <div className="mb-4 flex items-center gap-4">
        {value && (
          <div className="relative w-full flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline truncate"
            >
              {value.split('/').pop()} {/* Display file name */}
            </a>
            <Button
              type="button"
              onClick={() => onRemove(value)}
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="uc7kyp22">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <FileText className="h-4 w-4 mr-2" />
              Upload a File
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FileUpload;
