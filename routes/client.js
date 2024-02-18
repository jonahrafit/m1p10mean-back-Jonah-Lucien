const express = require( 'express' );
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  addPreferredEmployee,
  addPreferredService
} = require( '../service/clientService' );

router.get( '/:page/:size', getClients );
router.get( '/:_id', getClientById );
router.post( '/', createClient );
router.put( '/:clientId/preferences/employees/:employeeId/:level', addPreferredEmployee );
router.put( '/:clientId/preferences/services/:serviceId/:level', addPreferredService );

module.exports = router;