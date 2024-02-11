// models/OffresSpecial
const mongoose = require('mongoose');

const offresSpecialSchema = new mongoose.Schema({
    titre: { type: String },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    pourecentageReduction: { type: Number, required: true }
});

const OffresSpecial = mongoose.model('OffresSpecial', offresSpecialSchema);
module.exports = OffresSpecial;
