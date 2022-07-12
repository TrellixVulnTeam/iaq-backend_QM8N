const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async function (req, res) {
  try {
    // const co2 = new Co2({
    //   site: req.body.siteId,
    //   value: req.body.value,
    // });
    // await co2.save();
    console.log(req.body);
    res.json({ message: "Records added!" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});



module.exports = router;
