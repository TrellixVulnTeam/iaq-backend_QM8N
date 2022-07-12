const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var morgan = require("morgan");

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.qm6oc9a.mongodb.net/iaq?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const sites = require("./routes/sites");
const iot = require("./routes/iot");
const bodyParser = require("body-parser");

async function main() {
  await mongoose.connect(uri);
}

main().catch((err) => console.log(err));

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use("/api/sites", sites);
app.use("/api/iot", iot);

app.get("/", async (req, res) => {
  res.send("Hello from IAQ backend!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
