const express = require('express');

const router = express.Router();

/* GET default */
router.get('/', (req, res) => {
  res.status(200).send('Express server for Chahbot-Wordbbok-Quiz v0.1');
});

module.exports = router;
