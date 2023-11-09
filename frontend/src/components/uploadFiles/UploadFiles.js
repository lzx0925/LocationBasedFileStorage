import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const UploadFiles = ({ files, handleFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFiles(acceptedFiles);
    },
    multiple: true,
  });

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="drag-container" {...getRootProps()}>
      <input {...getInputProps()} />
      <FontAwesomeIcon icon={faUpload} className="icon" />
      <p>Drag & Drop files here</p>
      <p style={{ fontSize: "1rem" }}>or</p>
      <button className="third-button">Browse Files</button>
    </div>
  );
};

export default UploadFiles;
