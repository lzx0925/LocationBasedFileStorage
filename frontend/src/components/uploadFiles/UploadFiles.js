import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const maxSize = 5000000;

const UploadFiles = ({
  files,
  handleFiles,
  fileVibrate,
  handleOversizedFiles,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // handleFiles(acceptedFiles);
      acceptedFiles.forEach((file) => console.log(file.size, maxSize));
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > maxSize
      );
      const allowedFiles = acceptedFiles.filter((file) => file.size <= maxSize);

      if (oversizedFiles.length > 0) handleOversizedFiles(oversizedFiles);

      handleFiles(allowedFiles);
    },
    multiple: true,
  });

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div
      id="drag-container"
      className={fileVibrate ? "vibrate-animation" : ""}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FontAwesomeIcon icon={faUpload} className="icon" />
      <p>Drag & Drop files here</p>
      <p style={{ fontSize: "1rem" }}>or</p>
      <button className="third-button">Browse Files</button>
    </div>
  );
};

export default UploadFiles;
