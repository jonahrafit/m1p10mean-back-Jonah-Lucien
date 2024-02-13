const express = require('express');
const router = express.Router();
const { getEmploye } = require('../service/employeService');

router.get('/', async (req, res) => {
  try {
    const response = await getEmploye();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
