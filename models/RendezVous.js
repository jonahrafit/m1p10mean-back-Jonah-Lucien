// models/RendezVous.js
const mongoose = require( 'mongoose' );
const {
  clientSchema
} = require( './Client' );
const {
  serviceSchema
} = require( './Service' );
const {
  employeSchema
} = require( './Employe' );

const rendezVousSchema = new mongoose.Schema( {
  client: clientSchema,
  employee: employeSchema,
  date_created: {
    type: Date,
    required: true
  },
  mois: {
    type: Number,
    required: true
  },
  annee: {
    type: Number,
    required: true
  },
  date_rendez_vous: {
    type: Date,
    required: true
  },
  services: serviceSchema,
  fait: {
    type: Boolean,
  }
} );

const RendezVous = mongoose.model( 'RendezVous', rendezVousSchema );
module.exports = {
  RendezVous
};