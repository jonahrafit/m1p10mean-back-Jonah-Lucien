// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Manager = require('../models/Manager');
const Employe = require('../models/Employe');
const { sendConfirmationEmail } = require('./mailService');
const Client = require('../models/Client');

async function register(email, nom, prenom, motDePasse, role) {
    try {
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const existingUser = await User.findOne({ email });
        const existingManager = await Manager.findOne({ email });
        const existingClient = await Client.findOne({ email });

        if (existingUser !== null || existingManager !== null || existingClient !== null) {
            throw new Error("L'e-mail existe déjà");
        }

        if (role === 'manager') {
            const manager = new Manager({ email, nom, prenom });
            await manager.save();
        } else if (role === 'employee') {
            const employe = new Employe({ email, nom, prenom, horaireTravail: 'HT', estValide: false, estConfirme: false, tauxCommission: 0 });
            await sendConfirmationEmail(email, 'employee');
            await employe.save();
        }
        else if (role === 'client') {
            const client = new Client({ email, nom, prenom, preferenceEmploye: [], preferenceService: [] });
            await sendConfirmationEmail(email, 'client');
            await client.save();
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
        const error_log = "Nom d\'utilisateur ou mot de passe incorrect";
        if (!user) {
            throw new Error(error_log);
        }

        const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            throw new Error(error_log);
        }

        if (user.role === 'employee') {
            const employe = await Employe.findOne({ email });
            if (employe) {
                if (!employe.estConfirme) {
                    throw new Error("Email non confirmé");
                } else if (!employe.estValide) {
                    throw new Error("Email en attente de validation");
                }
            }
        } else if (user.role === 'client') {
            const client = await Client.findOne({ email });
            if (!client.estConfirme) {
                throw new Error("Email non confirmé");
            }
        }

        const token = jwt.sign({ email: user.email, role: user.role }, 'your-secret-key', { expiresIn: '2h' });
        return { token };

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

async function confirmCompte(email, str) {
    try {
        if (str === 'employee') {
            const employe = await Employe.findOne({ email });
            if (!employe) {
                throw new Error("Aucun employé trouvé avec cet e-mail");
            }
            employe.estConfirme = true;
            await employe.save();
        }
        if (str === 'client') {
            const client = await Client.findOne({ email });
            if (!client) {
                throw new Error("Aucun client trouvé avec cet e-mail");
            }
            client.estConfirme = true;
            await client.save();
        }
    } catch (error) {
        throw new Error('Erreur lors de la confirmation du compte');
    }
}

async function getUsers() {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la liste des utilisateurs');
    }
}

module.exports = { register, login, confirmCompte, getUsers };
