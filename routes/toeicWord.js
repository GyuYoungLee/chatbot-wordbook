const express = require("express");
const ToeicWord = require("../schemas/toeicWord");

const router = express.Router();

router.get("/", (req, res) => {
  ToeicWord.find({}).then(data => {
    res.json(data);
  });
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const toeicWord = new ToeicWord({ word, meaning });
  toeicWord.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = router;
