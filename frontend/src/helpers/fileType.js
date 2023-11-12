import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileImage,
  faFileExcel,
  faFilePdf,
  faFileWord,
  faFileLines,
  faFileCsv,
  faFileCode,
  faFileAudio,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons";

const getFileIcon = (fileType) => {
  console.log(fileType);
  switch (fileType) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "tiff":
    case "svg":
    case "webp":
      return faFileImage;
    case "xls":
    case "xlsx":
      return faFileExcel;
    case "pdf":
      return faFilePdf;
    case "doc":
    case "docx":
      return faFileWord;
    case "txt":
    case "log":
      return faFileLines;
    case "csv":
      return faFileCsv;
    case "html":
    case "css":
    case "js":
    case "json":
    case "xml":
      return faFileCode;
    case "mp3":
    case "wav":
    case "ogg":
      return faFileAudio;
    case "ppt":
    case "pptx":
      return faFilePowerpoint;
    default:
      return faFile; // Default icon for file types not listed
  }
};

export default getFileIcon;
