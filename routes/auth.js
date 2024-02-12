const express = require('express');
const router = express.Router();
const { register, login, confirmCompte } = require('../service/authService');

router.post('/register', async (req, res) => {
  const { email, nom, prenom, motDePasse, role } = req.body;
  try {
    const message = await register(email, nom, prenom, motDePasse, role);
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/confirm/compte/:email', async (req, res) => {
  const { email } = req.params;
  try {
    await confirmCompte(email);
    console.log("Compte confirmé avec succès");
    res.status(200).json({ message: "Compte confirmé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la confirmation du compte :", error.message);
    res.status(500).json({ error: "Erreur lors de la confirmation du compte" });
  }
});

router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const response = await login(email, motDePasse);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
