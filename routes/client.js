const express = require('express');
const router = express.Router();
const { getClient } = require('../service/clientService');

router.get('/', async (req, res) => {
  try {
    const response = await getClient();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
