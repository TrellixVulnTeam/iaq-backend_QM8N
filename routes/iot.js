const express = require("express");
const { TwitterApi } = require("twitter-api-v2");
const checkSv = require("../helpers/check-sv");
const auth = require("../middleware/auth");
const { SensorValue } = require("../models/sensor-value");
const router = express.Router();

router.post("/", auth, async function (req, res) {
  try {
    const sv = new SensorValue({
      site: req.body.site_id,
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
      .sort({ createdAt: 1 });
    res.json(data);
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

module.exports = router;
