const mongoose = require( 'mongoose' );
const {
  serviceSchema
} = require( './Service' );

const horaireTravailSchema = new mongoose.Schema( {
  jour: {
    type: String,
    required: true
  },
  temps: [ {
    temps_debut: {
      type: Number,
      required: true
    },
    temps_fin: {
      type: Number,
      required: true
    }
  } ],
  date_creation: {
    type: Date,
    required: true
  }
} );

const employeSchema = new mongoose.Schema( {
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  horaireTravail: [ horaireTravailSchema ],
  serviceOccupe: [ serviceSchema ],
  estValide: {
    type: Boolean,
    default: false
  },
  estConfirme: {
    type: Boolean,
    default: false
  },
  tauxCommission: {
    type: Number,
    required: true
  }
} );

const Employee = mongoose.model( 'Employe', employeSchema );
module.exports = {
  Employee,
  employeSchema
};