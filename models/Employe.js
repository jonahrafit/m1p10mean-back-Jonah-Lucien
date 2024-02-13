const mongoose = require('mongoose');

const horaireTravailSchema = new mongoose.Schema({
  day_of_week: { type: String, required: true },
  time: [{
    start_time: { type: String, required: true },
    end_time: { type: String, required: true }
  }]
});

const employeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  horaireTravail: [horaireTravailSchema],
  estValide: { type: Boolean, default: false },
  estConfirme: { type: Boolean, default: false },
  tauxCommission: { type: Number, required: true }
});

const Employe = mongoose.model('Employe', employeSchema);
module.exports = Employe;
