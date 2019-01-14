const express = require("express");
const cors = require("cors");
const request = require("request");
const cheerio = require("cheerio");
const charset = require("charset");
const iconv = require("iconv-lite");
const User = require("../schemas/User");

const router = express.Router();

// http://127.0.0.1:52277/myWords/5bcc761665d7d682a13df788?words=lost,find
router.use(cors());
router.get("/:userKey", async (req, res) => {
  const { userKey } = req.params;
  const { words } = req.query;

  if (words) {
    const newWords = words.split(","); // 단어장에 추가할 단어
    const myWords = []; // 사용자 단어장
    const tempArray = [];
    User.findOne({ userKey }, { _id: 0, wordbook: 1 })
      .then(async data => {
        data.wordbook.forEach(v => {
          const { word, meaning, dateStudied, cntStudied } = v;
          myWords.push({ word, meaning, dateStudied, cntStudied });
          tempArray.push(word);
        });
        // console.log(`1== ${JSON.stringify(myWords, null, 2)}`); // 기존 사용자 단어장

        // 네이버사전 조회
        for (const word of newWords) {
          const meaning = await searchWord(word);
          const obj = {
            word,
            meaning,
            dateStudied: new Date(),
            cntStudied: 1,
          };
          if (!tempArray.includes(word)) {
            myWords.push(obj);
          }
        }
        // console.log(`2== ${JSON.stringify(myWords, null, 2)}`); // 변경된 사용자 단어장

        // DB 저장
        User.updateOne({ userKey }, { $set: { wordbook: myWords } }).then(
          data => {
            console.log(`[Add words] ${userKey} ${data}`);
            res.json("단어장에 추가 되었습니다.");
          },
        );
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
    .first()
    .children("span.fnt_k05")
    .text()
    .trim();

  return text;
};

module.exports = router;
