require("dotenv").config();
const fs = require('fs').promises;
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.saveFiles = async (req, res) => {
  try {
    folderName = req.body.folderName;
    console.log(123, req.files);

    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send("No files were uploaded.");

    const uploadedFiles = Array.isArray(req.files.files)
      ? req.files.files
      : [req.files.files];

    console.log(456, uploadedFiles);

    for (const file of uploadedFiles) {
      const fileContent = await fs.readFile(file.tempFilePath);
    
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${file.name}`,
        Body: fileContent,
      };
    
      await s3.upload(uploadParams).promise();
    }

    res.json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error("Error in saveFiles:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.readFiles = async (req, res) => {
  try {
    const city = req.params.city;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: `${city}/`,
    };

    const data = await s3.listObjectsV2(params).promise();
    const fileUrls = await Promise.all(
      data.Contents.map(async (file) => {
        const url = await s3.getSignedUrlPromise("getObject", {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: file.Key,
          Expires: 600, // URL expiry time in seconds
        });
        const fileType = extractFileType(file.Key);

        return { name: file.Key, url, fileType };
      })
    );

    res.json({ files: fileUrls });
  } catch (error) {
    console.error("Error in readFiles:", error);
    return res.status(500).json({ message: error.message });
  }
};

function extractFileType(key) {
  const parts = key.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : undefined;
}
