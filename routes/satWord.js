const express = require("express");
const SatWord = require("../schemas/satWord");

const router = express.Router();

router.get("/", (req, res) => {
  SatWord.find({}).then(data => {
    res.json(data);
  });
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const satWord = new SatWord({ word, meaning });
  satWord.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = router;
