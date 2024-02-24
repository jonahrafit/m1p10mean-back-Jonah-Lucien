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


function addHoraireTraivailEmployee( req, res ) {
    console.log( "🚀 ~ addHoraireTraivailEmployee ~ req:", req.body );

    Employee.findById( {
            _id: req.params.employeId
        } )
        .then( async employee => {
            console.log( "🚀 ~ getEmployeeById ~ employee:", employee );
            employee.horaireTravail.push( {
                ...req.body,
                date_creation: new Date()
            } );
            const updatedEmployee = await employee.save();
            console.log( "🚀 ~ addHoraireTraivailEmployee ~ updatedEmployee:", updatedEmployee );
            return res.status( 200 ).json( updatedEmployee );
        } )
        .catch( error => {
            console.log( "🚀 ~ addHoraireTraivailEmployee ~ error:", error );
            return res.status( 400 ).json( {
                error: 'Employee not found'
            } );
        } );
}

function récupérerEmployesAvecPlageHoraireVide( req, res ) {
    console.log( "🚀 ~ récupérerEmployesAvecPlageHoraireVide ~ retrieveEmployeesWithEmptySchedule:", req.params );
    const {
        page,
        size
    } = req.params;
    const skip = ( page - 1 ) * size;
    Employee.find( {
            $where: "this.horaireTravail.length == 0"
        } )
        .skip( skip )
        .limit( size )
        .then( resultat => {
            console.log( "🚀 ~ récupérerEmployesAvecPlageHoraireVide ~ resultat:", resultat );
            return res.status( 200 ).json( resultat );
        } )
        .catch( error => { // Correction : La fonction catch prend en argument une fonction qui traite l'erreur
            console.log( "🚀 ~ récupérerEmployesAvecPlageHoraireVide ~ error:", error );
            return res.status( 500 ).json( {
                error: 'Internal server error.'
            } );
        } );
}

function updateEmployee( req, res ) {
    Employee.findByIdAndUpdate( {
            _id: req.params.id
        }, req.body, {
            new: true
        } )
        .then( updated => {
            console.log( "🚀 ~ updateEmployee ~ updated:", updated );
            return res.status( 200 ).json( updated );
        } )
        .catch( error => {
            console.log( "🚀 ~ updateEmployee ~ error:", error );
            return res.status( 500 ).json( {
                error: 'Internal server error'
            } );
        } )
}


module.exports = {
    getEmployees,
    getEmployeeById,
    addHoraireTraivailEmployee,
    récupérerEmployesAvecPlageHoraireVide,
    updateEmployee
};