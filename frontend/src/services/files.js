import axios from "axios";
const apiUrl = "http://localhost:5000";

export function uploadFiles(city, files) {
  const formData = new FormData();
  formData.append("folderName", city);
  files.forEach((file) => formData.append("files", file));
  console.log(666,formData);
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/files/upload`, formData)
      .then((response) => {
        console.log(response.data);
        resolve({ status: true, data: response.data });
      })
      .catch((err) => {
        console.log(err);
        reject({ status: false, err: err.message });
      });
  });
}

export function getFilesfromCity(city) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/files/${city}`)
      .then((response) => {
        resolve({
          status: true,
          files: response.data.files,
        });
      })
      .catch((err) => {
        console.log(err);
        reject({ status: false, err: err.message });
      });
  });
}
