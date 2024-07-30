const express = require('express');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await Article.getAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
