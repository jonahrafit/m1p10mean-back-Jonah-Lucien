// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Manager = require('../models/Manager');
const Employe = require('../models/Employe');

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { email, nom, prenom, motDePasse, role } = req.body;
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const existingUser = await User.findOne({ email });
    const existingManager = await Manager.findOne({ email });
    if (existingUser !== null || existingManager !== null) {
      return res.status(400).json({ error: "L'e-mail existe déjà" });
    }
    if (role === 'manager') {
      const manager = new Manager({ email, nom, prenom });
      await manager.save();
    } else if (role === 'employe') {
      const employe = new Employe({ email, nom, prenom, horaireTravail: '', estValide: false, estConfirme: false, tauxCommission: 0 });
      await employe.save();
    }
    const user = new User({ email, motDePasse: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Nom d'utilisateur incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

module.exports = router;
