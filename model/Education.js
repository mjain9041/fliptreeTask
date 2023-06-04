const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Education = new Schema(
  {
    name: {
      type: String,
      default: null
    }
  },
  {
    collection: "educations",
    timestamps: true
  }
);

module.exports = mongoose.model("Education", Education);
