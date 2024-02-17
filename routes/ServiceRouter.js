const express = require( 'express' );
const router = express.Router();
const {
    createService,
    getServices,
    updateService,
    deleteService
} = require( '../service/SalonService' );

router.post( '/', createService );
router.get( '/:page/:size', getServices );
router.put( '/:id', updateService );
router.delete( '/:id', deleteService );


module.exports = router;