const mongoose = require( 'mongoose' );
const {
    employeSchema
} = require( './Employe' );
const {
    serviceSchema
} = require( './Service' );

const preferenceEmployeSchema = new mongoose.Schema( {
    employee: employeSchema,
    niveauEtoile: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
} );

const preferenceServiceSchema = new mongoose.Schema( {
    service: serviceSchema,
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
        required: true
    },
    preferenceEmployees: [ preferenceEmployeSchema ],
    preferenceServices: [ preferenceServiceSchema ],
    estConfirme: {
        type: Boolean
    }
} );


const Client = mongoose.model( 'Client', clientSchema );
module.exports = {
    Client,
    clientSchema,
};