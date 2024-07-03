const express = require('express');
const { Newpatient, UpdatePatient, DeletePatient, DoctorAllPatient } = require('../Controllers/PatientController');
const { NewPrescription } = require('../Controllers/PrescriptionController');
const { DoctorDashboard } = require('../Controllers/DoctorController');
const Router = express.Router();

Router.route('/newpatient').post(Newpatient);
Router.route('/newprescrition').post(NewPrescription);
Router.route('/dashboard/:id').get(DoctorDashboard)
Router.route('/viewpatient/:id').get(DoctorAllPatient)
Router.route('/updatepatient/:id').put(UpdatePatient)
Router.route('/deletepatient/:id').delete(DeletePatient)
module.exports = Router