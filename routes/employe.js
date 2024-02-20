const express = require( 'express' );
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  addHoraireTraivailEmployee,
  récupérerEmployesAvecPlageHoraireVide
} = require( '../service/employeService' );

router.get( '/:page/:size', getEmployees );
router.get( '/:_id', getEmployeeById );
router.put( '/horaire-travail/:employeId', addHoraireTraivailEmployee );
router.get( '/horaire-vide/:page/:size', récupérerEmployesAvecPlageHoraireVide );

module.exports = router;