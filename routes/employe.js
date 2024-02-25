const express = require( 'express' );
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  addHoraireTraivailEmployee,
  récupérerEmployesAvecPlageHoraireVide,
  updateEmployee,
  addServiceToEmployee,
  getEmployeesHasService
} = require( '../service/employeService' );

router.get( '/:page/:size', getEmployees );
router.get( '/:_id', getEmployeeById );
router.get( '/horaire-vide/:page/:size', récupérerEmployesAvecPlageHoraireVide );
router.get( '/avec/services/by-id/:serviceId', getEmployeesHasService );
router.put( '/horaire-travail/:employeId', addHoraireTraivailEmployee );
router.put( '/:id', updateEmployee );
router.put( '/:employeeId/service/:serviceId', addServiceToEmployee );

module.exports = router;