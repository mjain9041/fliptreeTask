const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Intrest = new Schema(
  {
    name: {
      type: String,
      default: null
    }
  },
  {
    collection: "intrests",
    timestamps: true
  }
);

module.exports = mongoose.model("Intrest", Intrest);
