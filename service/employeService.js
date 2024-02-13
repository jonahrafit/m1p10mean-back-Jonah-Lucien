const Employe = require('../models/Employe');

async function getEmploye() {
    try {
        const employe = await Employe.find({});
        return employe;
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la liste des employe');
    }
}

module.exports = { getEmploye };
