const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  horaireTravail: { type: String, required: true },
  estValide: { type: Boolean, default: false },
  estConfirme: { type: Boolean, default: false },
  tauxCommission: { type: Number, required: true }
});

const Employe = mongoose.model('Employe', employeSchema);
module.exports = Employe;
