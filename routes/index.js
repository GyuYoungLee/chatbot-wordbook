const express = require("express");

const router = express.Router();

/* GET default */
router.get("/", (req, res) => {
  res.status(200).send("Express server for Chahbot-Word-Quiz v0.2");
});

module.exports = router;
