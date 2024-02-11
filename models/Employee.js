// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workSchedule: { type: String, required: true },
    commissionPercentage: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
