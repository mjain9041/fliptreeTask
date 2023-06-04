const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Cast = new Schema(
  {
    name: {
      type: String,
      default: null
    }
  },
  {
    collection: "casts",
    timestamps: true
  }
);

module.exports = mongoose.model("Cast", Cast);
