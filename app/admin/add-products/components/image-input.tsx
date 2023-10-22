"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageType } from "./add-product-form";
import { Button } from "@/components/ui/button";

interface ImageInputProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  item,
  handleFileChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
  });

  const handleCancel = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <div
        className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center mb-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} type="text" />
        {isDragActive ? (
          <p>Drop the image here</p>
        ) : (
          <p>+ {item?.color} Image</p>
        )}
      </div>
    </div>
  );
};