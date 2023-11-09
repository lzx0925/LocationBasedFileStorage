import React, { useState, useEffect } from "react";
import Location from "../components/location/Location";
import UploadFiles from "../components/uploadFiles/UploadFiles";
import Preview from "../components/preview/Preview";
import "./style.css";

const UploadPage = () => {
  const [files, setFiles] = useState([]);

  const handleFiles = (acceptedFiles) =>
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

  const deleteFiles = (deletedFiles) => {
    setFiles((currentFiles) => currentFiles.filter((f) => f !== deletedFiles));
    URL.revokeObjectURL(deletedFiles.preview);
  };

  const handleSubmit = async () => {
    // Add your submit logic here
    // You will now handle an array of files instead of a single file
  };

  return (
    <div id="upload-page">
      <Location />
      <div id="upload-container">
        <div className="left">
          <UploadFiles files={files} handleFiles={handleFiles} />
        </div>
        {files.length > 0 && (
          <div className="right">
            <Preview files={files} deleteFiles={deleteFiles} />
          </div>
        )}
      </div>
      <button className="upload-button" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
};
export default UploadPage;
