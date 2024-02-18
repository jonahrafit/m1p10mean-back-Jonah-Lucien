const {
    Employee
} = require( '../models/Employe' );
const {
    pathParamsSchema
} = require( './validation/CommonValidation' );



function getEmployees( req, res ) {
    console.log( "🚀 ~ EmployeeService ~ getEmployees:", req.params );
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
    Employee.find( {} )
        .skip( skip )
        .limit( size )
        .then( result => {
            console.log( "🚀 ~ EmployeeService ~ result:", result )
            return res.json( {
                page: page,
                size: size,
                employees: result
            } );
        } )
        .catch( error => {
            console.log( "🚀 ~ getEmployees ~ error fetching employees:", error );
            return res.status( 500 ).json( {
                error: 'Internal server error'
            } );
        } );

}

function getEmployeeById( req, res ) {
    console.log( "🚀 ~ EmployeeService ~ getEmployeeById:", req.params );
    const id = req.params;
    Employee.findById( id )
        .then( result => {
            console.log( "🚀 ~ getEmployeeById ~ result:", result );
            return res.status( 200 ).json( result );
        } )
        .catch( error => {
            console.log( "🚀 ~ getEmployeeById ~ error:", error );
            return res.status( 400 ).json( {
                error: 'Employee not found'
            } );
        } );

}


module.exports = {
    getEmployees,
    getEmployeeById
};