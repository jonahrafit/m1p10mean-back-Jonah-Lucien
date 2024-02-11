// models/RendezVous.js
const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  // Autres champs si nécessaire
});

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);
module.exports = RendezVous;
