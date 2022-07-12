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
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  });
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
