const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
console.log(typeof process.env.DB_URL);

module.exports.Files = require("./files");
