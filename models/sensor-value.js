const mongoose = require("mongoose");

const sensorValueSchema = new mongoose.Schema({
  site: {
    type: String,
    ref: "Site",
    required: true,
  },
  temperature: {
    required: true,
    type: Number,
  },
  humidity: {
    required: true,
    type: Number,
  },
  ambientLight: {
    required: true,
    type: Number,
  },
  uvIndex: {
    required: true,
    type: Number,
  },
  pressure: {
    required: true,
    type: Number,
  },
  sound: {
    required: true,
    type: Number,
  },
  co2: {
    required: true,
    type: Number,
  },
  voc: {
    required: true,
    type: Number,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const SensorValue = mongoose.model("SensorValue", sensorValueSchema);

exports.SensorValue = SensorValue;
