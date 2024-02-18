const express = require( 'express' );
const router = express.Router();
const {
  getEmployees,
  getEmployeeById
} = require( '../service/employeService' );

router.get( '/:page/:size', getEmployees );
router.get( '/:_id', getEmployeeById );

module.exports = router;