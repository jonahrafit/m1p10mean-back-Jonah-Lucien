const Manager = require('../models/Manager');

async function getManager() {
    try {
        const manager = await Manager.find({});
        return manager;
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la liste des manager');
    }
}

module.exports = { getManager };
