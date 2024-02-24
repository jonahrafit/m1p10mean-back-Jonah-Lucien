const {
    Client
} = require( '../models/Client' );
const {
    Employee
} = require( '../models/Employe' );
const {
    pathParamsSchema
} = require( './validation/CommonValidation' );
const {
    Service
} = require( '../models/Service' );


function getClients( req, res ) {
    console.log( "🚀 ~ ClientService ~ getClient:", req.params );
    const {
        error,
        value
    } = pathParamsSchema.validate( req.params );
    if ( error ) {
        return res.status( 400 ).json( {
            error: error.details[ 0 ].message
        } );
    }
    const {
        page,
        size
    } = value;
    const skip = ( page - 1 ) * size;
    Client.find( {} )
        .skip( skip )
        .limit( size )
        .then( result => {
            console.log( "🚀 ~ getClient ~ result:", result )
            return res.json( {
                page: page,
                size: size,
                clients: result
            } );
        } )
        .catch( error => {
            console.log( "🚀 ~ getClient ~ error fetching clients:", error );
            return res.status( 500 ).json( {
                error: 'Internal server error'
            } );
        } );

}

function getClientById( req, res ) {
    console.log( "🚀 ~ ClientService ~ getClientById:", req.params );
    const id = req.params;
    Client.findById( id )
        .then( result => {
            console.log( "🚀 ~ getClientById ~ result:", result );
            return res.status( 200 ).json( result );
        } )
        .catch( error => {
            console.log( "🚀 ~ getClientById ~ error:", error );
            return res.status( 400 ).json( {
                error: 'Client not found'
            } );
        } );

}


async function addPreferredService( req, res ) {
    console.log( "🚀 ~ ClientService ~ addPreferredService:", req.params );
    const {
        clientId,
        serviceId,
        level
    } = req.params;
    try {
        const service = await Service.findById( {
            _id: serviceId
        } );
        if ( !service ) {
            console.log( "🚀 ~ addPreferredService ~ Service not found" );
            return res.status( 404 ).json( {
                error: 'Service not found'
            } );
        }
        // Fetch the client by ID
        const client = await Client.findById( clientId ).populate( 'preferenceServices.service' );
        if ( !client ) {
            console.log( "🚀 ~ addPreferredService ~ Client not found" );
            return res.status( 404 ).json( {
                error: 'Client not found'
            } );
        }
        console.log( "🚀 ~ addPreferredService ~ service:", service );
        client.preferenceServices.push( {
            service,
            niveauEtoile: level
        } );
        // Save the updated client
        const updatedClient = await client.save();

        console.log( "🚀 ~ addPreferredService ~ Preferred service added successfully" );
        return res.status( 200 ).json( updatedClient );
    } catch ( error ) {
        console.log( "🚀 ~ addPreferredService ~ Error:", error );
        return res.status( 500 ).json( {
            error: 'Internal server error'
        } );
    }

}

async function addPreferredEmployee( req, res ) {
    console.log( "🚀 ~ ClientService ~ addPreferredEmployee:", req.params );

    const {
        clientId,
        employeeId,
        level
    } = req.params;

    try {
        console.log( "🚀 ~ addPreferredEmployee ~ employeeId:", employeeId )
        // Fetch the employee by ID

        const employee = await Employee.findById( {
            _id: employeeId
        } );
        if ( !employee ) {
            console.log( "🚀 ~ addPreferredEmployee ~ Employee not found" );
            return res.status( 404 ).json( {
                error: 'Employee not found'
            } );
        }

        // Fetch the client by ID
        const client = await Client.findById( clientId );
        if ( !client ) {
            console.log( "🚀 ~ addPreferredEmployee ~ Client not found" );
            return res.status( 404 ).json( {
                error: 'Client not found'
            } );
        }

        // Add employee to client's preferred list with level
        client.preferenceEmployees.push( {
            employee,
            niveauEtoile: level
        } );

        // Save the updated client
        const updatedClient = await client.save();

        console.log( "🚀 ~ addPreferredEmployee ~ Preferred employee added successfully" );
        return res.status( 200 ).json( updatedClient );
    } catch ( error ) {
        console.log( "🚀 ~ addPreferredEmployee ~ Error:", error );
        return res.status( 500 ).json( {
            error: 'Internal server error'
        } );
    }
}

function createClient( req, res ) {
    console.log( "🚀 ~ ClientService ~ creatClient:", req.body );
    return res.status( 200 ).json( req.body );
}

module.exports = {
    getClients,
    getClientById,
    createClient,
    addPreferredEmployee,
    addPreferredService
};