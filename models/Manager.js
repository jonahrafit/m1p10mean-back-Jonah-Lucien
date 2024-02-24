const mongoose = require( 'mongoose' );

const managerSchema = new mongoose.Schema( {
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
    }
} );

const Manager = mongoose.model( 'Manager', managerSchema );
module.exports = {
    Manager
};