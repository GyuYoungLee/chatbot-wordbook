const express = require("express");
const ElementaryWord = require("../schemas/ElementaryWordbook");

const router = express.Router();

router.get("/", (req, res) => {
  ElementaryWord.find(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const elementaryWord = new ElementaryWord({ word, meaning });
  elementaryWord
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(console.error);
});

module.exports = router;
