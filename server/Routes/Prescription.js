const express = require('express');
const { AdminViewPrescription, DoctorViewPrescription, DeletePrescription, PatientViewPrescription } = require('../Controllers/PrescriptionController');
const Router = express.Router();

Router.route('/admin/viewprescription').get(AdminViewPrescription)
Router.route('/doctor/viewprescription/:id').get(DoctorViewPrescription)
Router.route('/patient/viewprescription/:id').get(PatientViewPrescription)
Router.route('/admin/deleteprescription/:id').delete(DeletePrescription)
Router.route('/doctor/deleteprescription/:id').delete(DeletePrescription)


module.exports = Router