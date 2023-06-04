const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Job = new Schema(
  {
    name: {
      type: String,
      default: null
    }
  },
  {
    collection: "jobs",
    timestamps: true
  }
);

module.exports = mongoose.model("Job", Job);
