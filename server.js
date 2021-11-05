const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(cors());

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected ....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const eventSchema = {
  type: String,
  title: String,
  description: String,
};

const Event = mongoose.model("Event", eventSchema);

app.get("/", (req, res) => {
  Event.find().then((events) => res.json(events));
});

app.post("/", (req, res) => {
  const event = new Event({
    type: req.body.type,
    title: req.body.type,
    description: req.body.type,
  });
  event.save();
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening ....");
});
