import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import getFileIcon from "../helpers/fileType";
import { getFilesfromCity } from "../services/files";
import "./style.css";

const PreviewPage = () => {
  const [files, setFiles] = useState([]);
  const { city } = useParams();
  useEffect(() => {
    if (city)
      getFilesfromCity(city).then((response) => setFiles(response.files));
  }, [city]);

  useEffect(() => {
    console.log(666, files);
  }, [files]);
  return (
    <div id="preview-page">
      <div className="folder-container">
        <i>
          <FontAwesomeIcon icon={faFolderOpen} />
        </i>
        <p>{city}</p>
      </div>
      <div className="files-container">
        {files.length > 0 &&
          files.map((file, index) => {
            return (
              <div className="file" key={index}>
                <i>
                  <FontAwesomeIcon icon={getFileIcon(file.fileType)} />
                </i>
                <a href={file.url}>{file.name.slice(city.length + 1)}</a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PreviewPage;
