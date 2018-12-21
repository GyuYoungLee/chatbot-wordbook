const express = require("express");
const MiddleWord = require("../schemas/middleWord");

const router = express.Router();

router.get("/", (req, res) => {
  MiddleWord.find({}).then(data => {
    res.json(data);
  });
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const middleWord = new MiddleWord({ word, meaning });
  middleWord.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = router;
