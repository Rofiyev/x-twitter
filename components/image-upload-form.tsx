import Image from "next/image";
import { FC, ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  disabled: boolean;
  children: ReactNode;
  onChange: (base64: string) => void;
}

const ImageUploadForm: FC<Props> = ({ disabled, children, onChange }) => {
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },

    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default ImageUploadForm;
