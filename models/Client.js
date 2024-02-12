const mongoose = require('mongoose');

const preferenceEmployeSchema = new mongoose.Schema({
    employe: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe' },
    niveauEtoile: { type: Number, min: 0, max: 5, default: 0 }
});

const preferenceServiceSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    niveauEtoile: { type: Number, min: 0, max: 5, default: 0 }
});

const clientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferenceEmploye: [preferenceEmployeSchema],
    preferenceService: [preferenceServiceSchema]
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
