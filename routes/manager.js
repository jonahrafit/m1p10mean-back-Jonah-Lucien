const express = require('express');
const router = express.Router();
const { getManager } = require('../service/managerService');

router.get('/', async (req, res) => {
  try {
    const response = await getManager();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
