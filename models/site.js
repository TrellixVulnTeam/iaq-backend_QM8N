const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  _id: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Site = mongoose.model("Site", siteSchema);

exports.Site = Site;
