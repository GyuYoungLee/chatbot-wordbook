const express = require('express');
const Quiz = require('../schemas/quiz');

const router = express.Router();

// GET   /quiz
// GET   /quiz/:id
// POST  /quiz
// PATCH /quiz/:id
// DEL   /quiz/:id

router.get('/', (req, res) => {
  Quiz.find({})
    // .limit(10)
    .then(data => {
      res.send(JSON.stringify(data, null, 2));
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // res.send(`GET /quizes/${num}`);

  Quiz.find({ no: id })
    .then(data => {
      res.send(JSON.stringify(data, null, 2));
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/', (req, res) => {
  // res.send(`POST /quizes/`);
  const { no, word, choices, answer } = req.body;
  const quiz = new Quiz({ no, word, choices, answer });

  quiz
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`PUT /quizes/${id}`);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`DEL /quizes/${id}`);
});

module.exports = router;
