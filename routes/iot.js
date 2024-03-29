const express = require("express");
const { TwitterApi } = require("twitter-api-v2");
const checkSv = require("../helpers/check-sv");
const timeConverter = require("../helpers/time-converter");
const auth = require("../middleware/auth");
const { SensorValue } = require("../models/sensor-value");
const { constants } = require("../utils/constants");
const router = express.Router();

router.post("/", auth, async function (req, res) {
  try {
    const sv = new SensorValue({
      site: constants.currentSite,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      ambientLight: req.body.ambientLight,
      uvIndex: req.body.uvIndex,
      pressure: req.body.pressure,
      sound: req.body.sound,
      co2: req.body.co2,
      voc: req.body.voc,
      createdAt: Date.now(),
    });
    if (sv.co2 == 0) {
      return res.json({ message: "Zero value!" });
    }
    await sv.save();
    console.log(sv.toJSON());
    checkSv(sv.toJSON());
    res.json({ message: "Records added!" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/all/:siteId", auth, async function (req, res) {
  try {
    const data = await SensorValue.find({ site: req.params.siteId })
      .populate("site")
      .sort({ createdAt: -1 })
      .limit(200);
    data.sort((a, b) => a.createdAt - b.createdAt); 
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/all-alt/:siteId", auth, async function (req, res) {
  try {
    req.setTimeout(0);
    const data = await SensorValue.find({ site: req.params.siteId })
      .populate("site")
      .sort({ createdAt: 1 });

    let co2DataSeries = [];

    let tempDataSeries = [];

    let humidityDataSeries = [];

    let alDataSeries = [];

    let vocDataSeries = [];

    let uvDataSeries = [];

    let pressureDataSeries = [];

    let soundDataSeries = [];

    for (let j = 1; j < data.length; j++) {
      // if(j%2===0)
      co2DataSeries.push([timeConverter(data[j].createdAt), data[j].co2]);

      tempDataSeries.push([
        timeConverter(data[j].createdAt),
        data[j].temperature,
      ]);

      humidityDataSeries.push([
        timeConverter(data[j].createdAt),
        data[j].humidity,
      ]);

      alDataSeries.push([
        timeConverter(data[j].createdAt),
        data[j].ambientLight,
      ]);

      vocDataSeries.push([timeConverter(data[j].createdAt), data[j].voc]);

      uvDataSeries.push([timeConverter(data[j].createdAt), data[j].uvIndex]);
      pressureDataSeries.push([
        timeConverter(data[j].createdAt),
        data[j].pressure,
      ]);

      soundDataSeries.push([timeConverter(data[j].createdAt), data[j].sound]);
    }

    res.json({
      co2DataSeries: co2DataSeries,
      tempDataSeries: tempDataSeries,
      humidityDataSeries: humidityDataSeries,
      alDataSeries: alDataSeries,
      vocDataSeries: vocDataSeries,
      uvDataSeries: uvDataSeries,
      pressureDataSeries: pressureDataSeries,
      soundDataSeries: soundDataSeries,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/tweet", auth, async function (req, res) {
  try {
    const client = new TwitterApi({
      appKey: "y883MRupf0GMMSHAOmfyRZyQd",
      appSecret: "R22QzbdM2Em4EtNYarEAx2pkMLEmw9HNsDL8RgewXlpIwYSqw5",
      accessToken: "1555701998351429632-ABv59RICIUM7HCyy7xNieL52PUWHXd",
      accessSecret: "qW9TRttqVo6bCp8KnYSARxq2v74hvahriJIRdhw0Murp6",
    });

    client.v1
      .tweet("This tweet was written by a bot")
      .then((val) => {
        res.json({ message: "Tweet successfull!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Cannot tweet!" });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/delete-0", auth, async function (req, res) {
  try {
    await SensorValue.deleteMany({ co2: 0 });
    res.json({ message: "Deleted!" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
