"use client";

import React, { useRef, useState } from "react";
import { TbFileUpload } from "react-icons/tb";

interface FileUploadProps {
  accept?: string;
  onFileSelect?: (file: File) => void;
  label?: string;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = "image/*",
  onFileSelect,
  label = "Click here",
  maxSizeMB = 10,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Trigger hidden input
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  // Common file handler
  const handleFile = (file: File) => {
    if (file.size / 1024 / 1024 > maxSizeMB) {
      alert(`File exceeds ${maxSizeMB} MB limit`);
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect?.(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        padding: "10px 24px",
        borderRadius: "15px",
        background: "rgba(255, 255, 255, 0.8)",
        border: "1.5px solid #EFF0F2",
        marginBottom: "10px",
        transition: "border-color 0.2s",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div className="row d-flex justify-content-center align-items-center text-center">
        <div className="col-auto">
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "48px",
              height: "48px",
              background: "#EEF2FF",
            }}
          >
            <TbFileUpload size={24} className="color-evaluation-theme-blue" />
          </div>
        </div>
        <div className="col-auto text-start">
          <span className="fs14px fw-bold color-evaluation-theme-blue">
            {label}{" "}
          </span>
          to upload your file or drag.
          <p className="m-0" style={{ color: "#94A3B8" }}>
            {selectedFile
              ? selectedFile.name
              : `Supported Format: JPG, PNG (${maxSizeMB}mb each)`}
          </p>
        </div>
      </div>

      {previewUrl && (
        <div className="text-center mt-3">
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
