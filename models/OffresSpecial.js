// models/OffresSpecial
const mongoose = require( 'mongoose' );
const {
    serviceSchema
} = require( './Service' );

const offresSpecialSchema = new mongoose.Schema( {
    titre: {
        type: String
    },
    service: serviceSchema,
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    pourecentageReduction: {
        type: Number,
        required: true
    }
} );

const OffresSpecial = mongoose.model( 'OffresSpecial', offresSpecialSchema );
module.exports = {
    OffresSpecial
};