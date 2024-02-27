const express = require('express');
const router = express.Router();

const {
    setRendezVousClientWithEmployee,
    getRendezVous,
    updateRendezVous,
    deleteRendezVous,
    getRendezVousByEmployeBetweenDate,
    getRendezVousByEmployeID
} = require('../service/RendezVousService');

// SET AN APPOINTMENT FOR A CLIENT WITH HIS PREFER EMPLOYEE
router.post('/:clientId/:serviceId/:employeeId', setRendezVousClientWithEmployee);
router.put('/:id', updateRendezVous);
router.delete('/:id', deleteRendezVous);
router.get('/:page/:size', getRendezVous);
router.get('/employee/:employeId/:debut/:fin', getRendezVousByEmployeBetweenDate); // Route spécifique en premier
router.get('/employee/:employeId', getRendezVousByEmployeID); // Route générale après

module.exports = router;