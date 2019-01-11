const express = require("express");
const cors = require("cors");
const request = require("request");
const cheerio = require("cheerio");
const charset = require("charset");
const iconv = require("iconv-lite");
const User = require("../schemas/User");

const router = express.Router();

router.use(cors());
router.get("/:userKey", async (req, res) => {
  const { userKey } = req.params;
  const { words } = req.query;

  if (words) {
    const wordsList = words.split(",");
    const newList = [];
    const wordList = [];
    User.findOne({ userKey }, { _id: 0, wordbook: 1 })
      .then(async data => {
        data.wordbook.forEach(v => {
          const { word, meaning } = v;
          newList.push({ word, meaning });
          wordList.push(word);
        });
        // console.log(`1== ${JSON.stringify(newList, null, 2)}`);

        // 네이버사전 조회
        for (const word of wordsList) {
          const meaning = await searchWord(word);
          const ret = { word, meaning };
          if (!wordList.includes(word)) {
            newList.push(ret);
            // console.log(`2== ${JSON.stringify(newList, null, 2)}`);
          }
        }

        // DB 저장
        // console.log(`3== ${JSON.stringify(newList, null, 2)}`);
        User.updateOne({ userKey }, { $set: { wordbook: newList } }).then(
          data => {
            console.log(data);
            res.json("단어장에 추가 되었습니다.");
          },
        );
        // }
      })
      .catch(console.error);
  } else {
    res.send("missing parameter - words");
  }
});

// 네이버사전 단어 크롤링
const searchWord = async text => {
  const url = `https://endic.naver.com/popManager.nhn?sLn=kr&m=search&query=${text}`;
  const options = { url, encoding: null };

  try {
    const $$ = await downloadPage(options);
    const result = await parsePage($$);
    return result;
  } catch (err) {
    return console.error(err);
  }
};

const downloadPage = options =>
  new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      if (res.statusCode !== 200) {
        console.log(`Invalid status code <${res.statusCode}>`);
        resolve(downloadPage(options));
      }
      const enc = charset(res.headers, body);
      const result = iconv.decode(body, enc);
      resolve(cheerio.load(result));
    });
  });

const parsePage = $$ => {
  const searchResultEl =
    "#content > div:nth-child(3) > dl > dd:nth-child(2) > div > p";
  const text = $$(searchResultEl)
    .slice(0, 1)
    .children("span")
    .last()
    .text()
    .trim();

  return text;
};

module.exports = router;
