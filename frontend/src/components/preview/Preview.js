import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Preview = ({ files, deleteFiles }) => {
  // Function to convert bytes to a more readable format
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="preview-container">
      {files.length > 0 && (
        <div className="files-container">
          {files.map((file, index) => (
            <div className="file" key={index}>
              <div>
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={file.name}
                >
                  {file.name}
                </a>
                <p>({formatBytes(file.size)})</p>
              </div>
              <div>
                <button onClick={() => deleteFiles(file)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {files.length > 0 && <div className="display-container">image preview</div>} */}
    </div>
  );
};

export default Preview;
{
  /* {file.type.startsWith("image/") && (
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            style={{ width: 100, height: "auto" }}
          />
        )} */
}
