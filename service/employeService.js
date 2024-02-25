const {
    Employee
} = require( '../models/Employe' );

const {
    Service
} = require( '../models/Service' );

function getEmployees( req, res ) {
    console.log( "🚀 ~ EmployeeService ~ getEmployees:", req.params );
    const {
        page,
        size
    } = req.params;
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

function addServiceToEmployee( req, res ) {
    const {
        employeeId,
        serviceId
    } = req.params;
    Employee.findById( {
            _id: employeeId
        } )
        .then( employee => {
            console.log( "🚀 ~ addServiceToEmployee ~ employee:", employee );
            Service.findById( {
                    _id: serviceId
                } )
                .then( async service => {
                    employee.serviceOccupe.push( service );
                    const updatedEmployee = await employee.save();
                    console.log( "🚀 ~ addServiceToEmployee ~ updatedEmployee:", updatedEmployee );
                    return res.status( 200 ).json( {
                        message: true,
                        updatedEmployee
                    } );
                } )
                .catch( error => {
                    return res.status( 400 ).json( {
                        error: 'Service non trouve'
                    } );
                } )

        } )
        .catch( error => {
            console.log( "🚀 ~ addServiceToEmployee ~ error:", error );
            return res.status( 400 ).json( {
                error: 'Employee not found'
            } );
        } );
}
async function getEmployeesHasService( req, res ) {
    const {
        serviceId
    } = req.params;

    try {
        const employees = await Employee.aggregate( [ {
                $match: {
                    "serviceOccupe._id": serviceId
                }
            },
            {
                $addFields: {
                    matchedServiceOccupe: {
                        $filter: {
                            input: "$serviceOccupe",
                            as: "service",
                            cond: {
                                $eq: [ "$$service._id", serviceId ]
                            }
                        }
                    }
                }
            }
        ] );

        console.log( "Employees:", employees );
        res.json( employees );
    } catch ( err ) {
        console.error( "Error:", err );
        res.status( 500 ).json( {
            error: "Internal Server Error"
        } );
    }
}



module.exports = {
    getEmployees,
    getEmployeeById,
    addHoraireTraivailEmployee,
    récupérerEmployesAvecPlageHoraireVide,
    updateEmployee,
    addServiceToEmployee,
    getEmployeesHasService
};