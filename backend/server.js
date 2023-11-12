const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");
const fileUpload = require("express-fileupload");
const filesRoute = require("./routes/files");
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.use("/files", filesRoute);

//database
mongoose
  .connect(process.env.DB_URL, {
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully!"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
