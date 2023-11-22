import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Location from "../components/location/Location";
import UploadFiles from "../components/uploadFiles/UploadFiles";
import Preview from "../components/preview/Preview";
import { message } from 'antd';
import { uploadFiles } from "../services/files";
import "./style.css";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [oversizedFiles, setOverSizedFiles] = useState([]);
  const [city, setCity] = useState();
  const [consent, setConsent] = useState(false);
  const [modify, setModify] = useState(false);
  const [checkBoxVibrate, setCheckBoxVibrate] = useState(false);
  const [inputVibrate, setInputVibrate] = useState(false);
  const [fileVibrate, setFileVibrate] = useState(false);

  const handleModify = (value) => setModify(value);

  const handleCity = (input) => setCity(input);

  const handleFiles = (acceptedFiles) =>
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

  const deleteFiles = (deletedFiles) => {
    setFiles((currentFiles) => currentFiles.filter((f) => f !== deletedFiles));
    URL.revokeObjectURL(deletedFiles.preview);
  };

  const handleOversizedFiles = (files) => {
    setOverSizedFiles(files);
    files.forEach((file) => deleteFiles(file));
  };

  useEffect(() => {
    if (oversizedFiles.length > 0) {
      oversizedFiles.forEach((file) =>
        alert(file.name + " exceeds the max size, upload failed.")
      );
    }
  }, [oversizedFiles]);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!consent) {
      setCheckBoxVibrate(true);
      setTimeout(() => setCheckBoxVibrate(false), 500);
    }
    if (!city) {
      message.error('The system has not detected your location, please input your city manually')
      setTimeout(() => setInputVibrate(false), 500);
    }
    if (modify || !city) {
      setInputVibrate(true);
      setTimeout(() => setInputVibrate(false), 500);
    }
    if (files.length === 0) {
      setFileVibrate(true);
      setTimeout(() => setFileVibrate(false), 500);
    }
    if (consent && !modify && files.length > 0 && city) {
      uploadFiles(city, files).then((response) => {
        navigate(`/file/${city}`);
      });
    }
  };

  return (
    <div id="upload-page">
      <Location
        city={city}
        handleCity={handleCity}
        handleModify={handleModify}
        inputVibrate={inputVibrate}
      />
      <div id="upload-container">
        <div className="left">
          <UploadFiles
            files={files}
            handleFiles={handleFiles}
            fileVibrate={fileVibrate}
            handleOversizedFiles={handleOversizedFiles}
          />
        </div>
        {files.length > 0 && (
          <div className="right">
            <Preview files={files} deleteFiles={deleteFiles} />
          </div>
        )}
      </div>
      <div
        id="consent-box"
        className={checkBoxVibrate ? "vibrate-animation" : ""}
      >
        <p style={{ color: "red" }}>*</p>
        <input
          type="checkbox"
          onChange={() => {
            setConsent(!consent);
            setCheckBoxVibrate(false);
          }}
        />
        <p>
          By clicking the consent box, you acknowledge and agree to our reminder
          not to upload private or sensitive files on this public website.
        </p>
      </div>
      <button className="third-button" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
};
export default UploadPage;
