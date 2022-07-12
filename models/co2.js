const mongoose = require("mongoose");

const co2Schema = new mongoose.Schema({
  value: {
    required: true,
    type: String
  },
  site: {
    type: String,
    ref: "Site",
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const Co2 = mongoose.model("Co2", co2Schema);

exports.Co2 = Co2;
