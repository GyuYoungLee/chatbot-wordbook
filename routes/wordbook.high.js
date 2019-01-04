const express = require("express");
const HighWord = require("../schemas/HighWordbook");

const router = express.Router();

router.get("/", (req, res) => {
  HighWord.find(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const highWord = new HighWord({ word, meaning });
  highWord
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(console.error);
});

module.exports = router;
