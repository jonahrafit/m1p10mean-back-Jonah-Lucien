const {
    Service
} = require( '../models/Service' );
const {
    OffresSpecial
} = require( '../models/OffresSpecial' );

const {
    Client
} = require( '../models/Client' );
require( 'dotenv' ).config();

const {
    sendNofiticationEmail
} = require( './mailService' );

async function createOffreSpecial( req, res ) {
    const offreSpecial = req.body;
    const {
        id
    } = req.params;
    const serviceById = await Service.findById( {
        _id: id
    } );
    if ( serviceById ) {
        console.log( "🚀 ~ createOffreSpecial ~ serviceById:", serviceById );
        offreSpecial.service = JSON.parse( JSON.stringify( serviceById ) );
        const offreSpec = new OffresSpecial( offreSpecial );
        const saved = await offreSpec.save();
        // SEND EMAIL TO ALL CLIENT THAT A NEW OFFER IS AVAILABLE
        sendNotificationToAllClientOfnewOffer();

        return res.status( 200 ).json( saved );
    }
    return res.status( 400 ).json( {
        error: "Service non trouve"
    } );
}

function sendNotificationToAllClientOfnewOffer() {
    const frontLink = process.env.FRONT_END_LINK;
    Client.find( {} )
        .then( clients => {
            for ( client of clients ) {
                const email = client.email;
                // send email;
                sendNofiticationEmail( email, `${client.nom} ${client.prenom}`, frontLink );
            }
        } )
        .catch( error => {
            console.log( "🚀 ~ sendNotificationToAllClientOfnewOffer ~ error:", error );
        } )
}

async function updateOffreSpecial( req, res ) {
    const {
        id
    } = req.params;
    console.log( "🚀 ~ updateOffreSpecial ~ req.body:", req.body );
    const offreSpecial = await OffresSpecial.findByIdAndUpdate( {
        _id: id
    }, req.body, {
        new: true
    } );
    if ( !offreSpecial ) {
        return res.status( 400 ).json( {
            error: 'Offre special non trouve'
        } );
    }
    return res.status( 200 ).json( offreSpecial );
}

async function getOffreSpecial( req, res ) {
    const {
        page,
        size
    } = req.params;
    const skip = ( page - 1 ) * size;
    console.log( "🚀 ~ getOffreSpecial ~ req.body:", req.body );

    const offreSpecial = await OffresSpecial.find( req.body ).skip( skip )
        .limit( size );
    if ( !offreSpecial ) {
        return res.status( 200 ).json( {
            offreSpecials: []
        } );
    }
    return res.status( 200 ).json( {
        offreSpecials: offreSpecial
    } );
}

async function deleteOffreSpecial( req, res ) {
    const fofreSpecialDeleted = await OffresSpecial.findByIdAndDelete( {
        _id: req.params.id
    } );
    return res.status( 200 ).json( fofreSpecialDeleted );
}

module.exports = {
    createOffreSpecial,
    updateOffreSpecial,
    getOffreSpecial,
    deleteOffreSpecial
}