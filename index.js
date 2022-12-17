const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const jobListModel = require("./models/jobList.model.js");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  try {
    const jobData = await jobListModel.find().limit(10);
    res.send({ jobData });
  } catch (error) {
    console.log(error);
  }
});

app.post("/joblist", async (req, res) => {
  const { company, postedAt, city, location,role,level,contract,position,language } = req.body;
 
  const jobList = new jobListModel({
    company,
    postedAt,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  });
  await jobList.save();
  res.send({ jobList });
});


app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Runnig at : http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
