const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://guarded-castle-03810.herokuapp.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    type: String,
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);
//db.collectionName.find({ start_date: new Date() }).pretty();
const Event = mongoose.model("Event", eventSchema);

app.get("/", (req, res) => {
  Event.find().then((events) => res.json(events));
});

app.post("/", (req, res) => {
  const event = new Event(req.body);
  event.save();
});

app.listen(process.env.PORT || 5000, () => console.log("Server is running..."));
