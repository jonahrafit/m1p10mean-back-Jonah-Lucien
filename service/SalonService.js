const {
    Service
} = require( '../models/Service' );
const {
    PostServiceSchema,
    PutServiceSchema,
    pathParamsSchema
} = require( './validation/SalonServiceValidation' );

function createService( req, res ) {
    console.log( "🚀 ~ SalonService ~ createService:", req.body );
    const {
        error,
        value
    } = PostServiceSchema.validate( req.body );
    if ( error ) {
        console.log( "🚀 ~ createService ~ error:", error );
        return res.status( 400 ).json( {
            error: error.details[ 0 ].message
        } );
    }
    const service = new Service( value );
    service.save();
    res.status( 200 ).json( req.body );
}

function getServices( req, res ) {
    console.log( "🚀 ~ SalonService ~ getServices:", req.params );
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
    Service.find( {} )
        .skip( skip )
        .limit( size )
        .then( result => {
            console.log( "🚀 ~ getServices ~ result:", result );
            Service.countDocuments( {} )
                .then( count => {
                    console.log( "Total count:", count );
                    return res.json( {
                        page: page,
                        size: size,
                        total: count,
                        services: result
                    } );
                } )
                .catch( err => {
                    console.error( "Error fetching services:", err );
                    return res.status( 500 ).json( {
                        error: "Internal Server Error"
                    } );
                } );
        } )
        .catch( error => {
            console.log( "🚀 ~ getServices ~ error fetching services:", error );
            return res.status( 500 ).json( {
                error: 'Internal server error'
            } );
        } )
}


async function updateService( req, res ) {
    console.log( "🚀 ~ SalonService ~ updateService:", req );
    const {
        error,
        value
    } = PutServiceSchema.validate( req.body );

    if ( error ) {
        return res.status( 400 ).json( {
            error: error.details[ 0 ].message
        } );
    }
    console.log( "🚀 ~ updateService ~ value:", value );
    console.log( "🚀 ~ updateService ~ id:", req.params );
    const service = await Service.findByIdAndUpdate( {
        _id: req.params.id
    }, value, {
        new: true
    } );
    if ( !service ) {
        return res.status( 400 ).json( {
            error: 'Service non trouve'
        } );
    }
    console.log( "🚀 ~ updateService ~ updated:", service );
    return res.status( 200 ).json( service );
}

function deleteService( req, res ) {
    console.log( "🚀 ~ SalonService ~ deleteService:", req );
    const id = req.params.id;
    Service.findByIdAndDelete( id )
        .then( deleted => {
            console.log( "🚀 ~ deleteService ~ resultat:", deleted );
            if ( !deleted ) return res.status( 404 ).json( {
                error: 'Service not found',
                suggestion: 'Ensure you are providing the correct service ID for deletion.'
            } );
            return res.status( 200 ).json( {
                message: 'Service deleted successfully',
                service: deleted
            } );
        } )
        .catch( error => {
            console.log( "🚀 ~ deleteService ~ error:", error );
            return res.status( 500 ).json( {
                error: 'Internal server error'
            } );
        } )
}


module.exports = {
    createService,
    getServices,
    updateService,
    deleteService
};