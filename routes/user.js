const express = require("express");
const User = require("../schemas/User");

const router = express.Router();

router.get("/:userKey", (req, res) => {
  const { userKey } = req.params;
  User.findOne({ userKey })
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});

router.post("/:userKey", (req, res) => {
  const { userKey } = req.params;
  const currentCourse = "";
  const user = new User({ userKey, currentCourse });
  user
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});

router.put("/:userKey", (req, res) => {
  const { userKey } = req.params;
  const query = req.body;
  // res.json({ userKey, query });
  User.updateOne({ userKey }, { $set: query })
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});

router.delete("/:userKey", (req, res) => {
  const { userKey } = req.params;
  User.remove({ userKey })
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});

module.exports = router;
