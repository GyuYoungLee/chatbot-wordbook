const fs = require("fs");
const connect = require("./schemas");
const ElementaryWordbook = require("./schemas/ElementaryWordbook");
const MiddleWordbook = require("./schemas/MiddleWordbook");
const HighWordbook = require("./schemas/HighWordbook");
const SatWordbook = require("./schemas/SatWordbook");
const ToeicWordbook = require("./schemas/ToeicWordbook");

const inputFile1 = "./assets/elementaryWords.json";
const inputFile2 = "./assets/middleWords.json";
const inputFile3 = "./assets/highWords.json";
const inputFile4 = "./assets/satWords.json";
const inputFile5 = "./assets/toeicWords.json";

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
    const elementaryWordbook = new ElementaryWordbook({ word, meaning });
    elementaryWordbook
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

// // 중등단어
fs.readFile(inputFile2, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const middleWordbook = new MiddleWordbook({ word, meaning });
    middleWordbook
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
    const highWordbook = new HighWordbook({ word, meaning });
    highWordbook
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

// // 수능단어
fs.readFile(inputFile4, "utf8", (err, data) => {
  if (err) console.error(err);
  const words = JSON.parse(data);
  words.forEach(v => {
    const { A, C } = v;
    const word = A;
    const meaning = C.split("|").join(", ");

    // mongoDB insert
    const satWordbook = new SatWordbook({ word, meaning });
    satWordbook
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
    const toeicWordbook = new ToeicWordbook({ word, meaning });
    toeicWordbook
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  });
});
