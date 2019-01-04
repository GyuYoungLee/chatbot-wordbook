const express = require("express");
const MiddleWord = require("../schemas/MiddleWordbook");

const router = express.Router();

router.get("/", (req, res) => {
  MiddleWord.find(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const middleWord = new MiddleWord({ word, meaning });
  middleWord
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(console.error);
});

module.exports = router;
