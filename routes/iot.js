const express = require("express");
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
    });
    await sv.save();
    console.log(sv.toJSON());
    res.json({ message: "Records added!" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/latest/:siteId", auth, async function (req, res) {
  try {
    const from = Date.now() - 7200000;
    console.log("From", from);
    const data = await SensorValue.find({
      site: req.params.siteId.toUpperCase(),
      createdAt: { $gt: from },
    }).populate("site").sort({ createdAt: -1 });
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
