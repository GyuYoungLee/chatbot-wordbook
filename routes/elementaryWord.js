const express = require("express");
const ElementaryWord = require("../schemas/elementaryWord");

const router = express.Router();

router.get("/", (req, res) => {
  ElementaryWord.find({}).then(data => {
    res.json(data);
  });
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const elementaryWord = new ElementaryWord({ word, meaning });
  elementaryWord.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = router;
