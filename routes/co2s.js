const express = require("express");
const auth = require("../middleware/auth");
const { Co2 } = require("../models/co2");
const router = express.Router();

router.post("/add", auth, async function (req, res) {
  try {
    const co2 = new Co2({
      site: req.body.siteId,
      value: req.body.value,
    });
    await co2.save();
    res.json({ message: "Record added!" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/all", auth, async function (req, res) {
    try {
      const rslt = await Co2.find({}).populate("site");
      res.json(rslt);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });

module.exports = router;
