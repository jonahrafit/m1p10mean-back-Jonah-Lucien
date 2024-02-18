const mongoose = require( 'mongoose' );
const {
    employeSchema
} = require( './Employe' );

const preferenceEmployeSchema = new mongoose.Schema( {
    employees: [ employeSchema ],
    niveauEtoile: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
} );

const preferenceServiceSchema = new mongoose.Schema( {
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    niveauEtoile: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
} );

const clientSchema = new mongoose.Schema( {
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
        required: true,
        unique: true
    },
    preferenceEmployees: [ preferenceEmployeSchema ],
    preferenceServices: [ preferenceServiceSchema ],
    estConfirme: {
        type: Boolean
    }
} );

const Client = mongoose.model( 'Client', clientSchema );
module.exports = Client;