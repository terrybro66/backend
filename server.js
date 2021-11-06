const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

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
  const event = new Event(req.body);
  event.save();
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
