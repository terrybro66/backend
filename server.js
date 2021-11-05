const express = require("express");
const app = express();
const mongoose = require("mongoose");

const db =
  process.env.MONGO_URI ||
  "mongodb+srv://terry:terry61@cluster0.kgsov.mongodb.net/myDb?retryWrites=true&w=majority";

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

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
