const express = require("express");
const ToeicWord = require("../schemas/ToeicWordbook");

const router = express.Router();

// const query = {
//   word: {
//     $in: ["able", "about", "absent", "address", "air"],
//   },
// };
// Todo: req.query 방어 코드 추가
router.get("/", (req, res) => {
  ToeicWord.find(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});
router.post("/", (req, res) => {
  const { word, meaning } = req.body;
  const toeicWord = new ToeicWord({ word, meaning });
  toeicWord
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(console.error);
});

module.exports = router;
