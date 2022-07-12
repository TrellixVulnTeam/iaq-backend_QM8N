const express = require("express");
const auth = require("../middleware/auth");
const { Site } = require("../models/site");
const router = express.Router();

router.get("/all", auth, async function (req, res) {
  try {
    const rslt = await Site.find({});
    res.json(rslt);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
