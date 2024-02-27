const express = require( 'express' );
const router = express.Router();

const {
    setRendezVousClientWithEmployee,
    getRendezVous,
    updateRendezVous,
    deleteRendezVous,
    getRendezVousByEmployeBetweenDate,
    getRendezVousByEmploye
} = require( '../service/RendezVousService' );

// SET AN APPOINTMENT FOR A CLIENT WITH HIS PREFER EMPLOYEE
router.post( '/:clientId/:serviceId/:employeeId', setRendezVousClientWithEmployee );
router.get( '/:employeId', getRendezVousByEmploye );
router.get( '/:page/:size', getRendezVous );
router.put( '/:id', updateRendezVous );
router.delete( '/:id', deleteRendezVous );
router.get( '/employee/:employeId/:debut/:fin', getRendezVousByEmployeBetweenDate );


module.exports = router;