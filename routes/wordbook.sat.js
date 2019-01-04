const express = require("express");
const SatWord = require("../schemas/SatWordbook");

const router = express.Router();

router.get("/", (req, res) => {
  SatWord.find(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const satWord = new SatWord({ word, meaning });
  satWord
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(console.error);
});

module.exports = router;
