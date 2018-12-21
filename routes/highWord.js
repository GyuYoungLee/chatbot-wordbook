const express = require("express");
const HighWord = require("../schemas/highWord");

const router = express.Router();

router.get("/", (req, res) => {
  HighWord.find({}).then(data => {
    res.json(data);
  });
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const highWord = new HighWord({ word, meaning });
  highWord.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = router;
