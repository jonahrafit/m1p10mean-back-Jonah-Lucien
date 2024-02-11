// models/RendezVous.js
const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  services: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    quantite: { type: Number, default: 1 },
    prix: { type: Number, required: true },
    commission: { type: Number, required: true }
  }],
  totalPrix: { type: Number, required: true }
});

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);
module.exports = RendezVous;
