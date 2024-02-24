const express = require( 'express' );
const router = express.Router();

const {
    setRendezVousClientWithEmployee,
    getRendezVous,
    updateRendezVous,
    deleteRendezVous
} = require( '../service/RendezVousService' );

// SET AN APPOINTMENT FOR A CLIENT WITH HIS PREFER EMPLOYEE
router.post( '/:clientId/:serviceId/:employeeId', setRendezVousClientWithEmployee );
router.get( '/:page/:size', getRendezVous );
router.put( '/:id', updateRendezVous );
router.delete( '/:id', deleteRendezVous );

module.exports = router;