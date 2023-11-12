const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const filesSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
  },
  fileName: { type: String, required: true },
  IP: {
    type: String,
    required: true,
  },
  
});

filesSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("IP")) {
      return next();
    }
    let hashedIP = await bcrypt.hash(this.IP, 10);
    console.log("hash", hashedIP);
    this.IP = hashedIP;
    return next();
  } catch (err) {
    return next(err);
  }
});

filesSchema.index({ folderName: 1, fileName: 1 }, { unique: true });

const Files = mongoose.model("Files", filesSchema);

module.exports = Files;
