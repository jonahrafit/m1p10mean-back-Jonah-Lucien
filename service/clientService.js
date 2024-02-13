const Client = require('../models/Client');

async function getClient() {
    try {
        const client = await Client.find({});
        return client;
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la liste des client');
    }
}

module.exports = { getClient };
