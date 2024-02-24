const {
    RendezVous
} = require( '../models/RendezVous' );
const {
    Client,
    clientSchema
} = require( '../models/Client' );
const {
    Employee
} = require( '../models/Employe' );
const {
    Service
} = require( '../models/Service' );

async function setRendezVousClientWithEmployee( req, res ) {
    try {
        const {
            clientId,
            serviceId,
            employeeId
        } = req.params;

        // Vérifier le client
        const clientById = await Client.findById( {
            _id: clientId
        } );
        if ( !clientById ) throw new Error( 'Client not found' );

        // Vérifier l'employé
        const employeeById = await Employee.findById( {
            _id: employeeId
        } );
        if ( !employeeById ) throw new Error( 'Employee not found' );

        // Vérifier si l'employé est dans la liste de préférences du client
        if ( !isEmployeeInClientPreferList( clientById, employeeById ) ) {
            clientById.preferenceEmployees.push( {
                employee: employeeById,
                niveauEtoile: 0
            } );
            await clientById.save();
        } else {
            console.log( "🚀 ~ setRendezVousClientWithEmployee ~ already in his list:" );
        }

        // Vérifier le service
        const serviceResult = await Service.findById( {
            _id: serviceId
        } );
        if ( !serviceResult ) throw new Error( 'Service not found' );

        // Vérifier si le service est dans la liste de préférences du client
        if ( !isServiceInClientPreferList( clientById, serviceResult ) ) {
            clientById.preferenceServices.push( {
                service: serviceResult,
                niveauEtoile: 0
            } );
            await clientById.save();
        }

        // Sauvegarder un nouveau rendez-vous dans la base de données
        const dateRendezVous = new Date( req.body.dateRendezVous );
        const month = dateRendezVous.getMonth();
        const year = dateRendezVous.getFullYear();
        const rendezVous = new RendezVous( {
            client: clientById,
            employee: employeeById,
            date_created: new Date(),
            mois: month,
            annee: year,
            date_rendez_vous: dateRendezVous,
            services: serviceResult,
            fait: false
        } );

        // Sauvegarder le nouveau document RendezVous
        const rendezVousSaved = await rendezVous.save();
        return res.status( 200 ).json( rendezVousSaved );
    } catch ( error ) {
        console.log( "🚀 ~ setRendezVousClientWithEmployee ~ error:", error );
        return res.status( 400 ).json( {
            error: error.message
        } );
    }
}

async function getRendezVous( req, res ) {
    const {
        page,
        size
    } = req.params;
    const skip = ( page - 1 ) * size;
    console.log( "🚀 ~ getRendezVous ~ req.body:", req.body );

    const rendezVous = await RendezVous.find( req.body ).skip( skip )
        .limit( size );
    if ( !rendezVous ) {
        return res.status( 200 ).json( {
            rendezVous: []
        } );
    }
    return res.status( 200 ).json( {
        rendezVous
    } );

}

async function updateRendezVous( req, res ) {
    const {
        id
    } = req.params;
    const rendezVous = await RendezVous.findByIdAndUpdate( {
        _id: id
    }, {
        fait: true
    } );
    if ( !rendezVous ) {
        return res.status( 400 ).json( {
            error: 'Rendez vous non trouve'
        } );
    }
    return res.status( 200 ).json( rendezVous );
}

async function deleteRendezVous( req, res ) {
    const rendezVousDeleted = await RendezVous.findByIdAndDelete( {
        _id: req.params.id
    } );
    return res.status( 200 ).json( rendezVousDeleted );
}

function isEmployeeInClientPreferList( client, employee ) {
    for ( const employeePrefer of client.preferenceEmployees ) {
        if ( employeePrefer.employee.email === employee.email ) {
            return true;
        }
    }
    return false;
}

function isServiceInClientPreferList( client, service ) {
    for ( const servPrefer of client.preferenceServices ) {
        if ( servPrefer.service._id.equals( service._id ) ) {
            return true;
        }
    }
    return false;
}


module.exports = {
    setRendezVousClientWithEmployee,
    getRendezVous,
    updateRendezVous,
    deleteRendezVous
};