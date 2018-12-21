const fs = require("fs");
const connect = require("./schemas");
const ElementaryWord = require("./schemas/elementaryWord");
const MiddleWord = require("./schemas/middleWord");
const HighWord = require("./schemas/highWord");
const SatWord = require("./schemas/satWord");
const ToeicWord = require("./schemas/toeicWord");

const inputFile1 = "./assets/elementaryWord.json";
const inputFile2 = "./assets/middleWord.json";
const inputFile3 = "./assets/highWord.json";
const inputFile4 = "./assets/satWord.json";
const inputFile5 = "./assets/toeicWord.json";

connect();

// 초등단어
fs.readFile(inputFile1, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const elementaryWord = new ElementaryWord({ word, meaning });
    elementaryWord
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

// 중등단어
fs.readFile(inputFile2, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const middleWord = new MiddleWord({ word, meaning });
    middleWord
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

// 고등단어
fs.readFile(inputFile3, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const highWord = new HighWord({ word, meaning });
    highWord
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

// 수능단어
fs.readFile(inputFile4, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const satWord = new SatWord({ word, meaning });
    satWord
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

// 토익단어
fs.readFile(inputFile5, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const toeicWord = new ToeicWord({ word, meaning });
    toeicWord
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});
