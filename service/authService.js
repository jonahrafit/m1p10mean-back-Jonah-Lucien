// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Manager = require('../models/Manager');
const Employe = require('../models/Employe');
const { sendConfirmationEmail } = require('./mailService');

async function register(email, nom, prenom, motDePasse, role) {
    try {
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const existingUser = await User.findOne({ email });
        const existingManager = await Manager.findOne({ email });

        if (existingUser !== null || existingManager !== null) {
            throw new Error("L'e-mail existe déjà");
        }

        if (role === 'manager') {
            const manager = new Manager({ email, nom, prenom });
            await manager.save();
        } else if (role === 'employee') {
            const employe = new Employe({ email, nom, prenom, horaireTravail: 'HT', estValide: false, estConfirme: false, tauxCommission: 0 });
            await sendConfirmationEmail(email);
            await employe.save();
        }

        const user = new User({ email, motDePasse: hashedPassword, role });
        await user.save();
        return { message: 'Inscription réussie' };
    } catch (error) {
        console.log('ERREUR ', error);
        throw new Error("Erreur lors de l'inscription");
    }
}

async function login(email, motDePasse) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Nom d'utilisateur incorrect");
        }

        const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect');
        }

        const token = jwt.sign({ email: user.email, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
        return { token };
    } catch (error) {
        throw new Error('Erreur lors de la connexion');
    }
}

async function confirmCompte(email) {
    try {
        const employe = await Employe.findOne({ email });

        if (!employe) {
            throw new Error("Aucun employé trouvé avec cet e-mail");
        }

        employe.estConfirme = true;
        await employe.save();
    } catch (error) {
        throw new Error('Erreur lors de la confirmation du compte');
    }
}

module.exports = { register, login, confirmCompte };
