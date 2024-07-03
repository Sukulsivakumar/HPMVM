const express = require('express');
const { AddDoctor, AllDoctor, UpdateDoctor, DeleteDoctor } = require('../Controllers/DoctorController');
const {UpdatePatient, DeletePatient, AdminAllPatient} =require('../Controllers/PatientController')
const { Addadmin, AdminDashboard } = require('../Controllers/AdminController');
const Router = express.Router();

Router.route('/adddoctor').post(AddDoctor);
Router.route('/addadmin').post(Addadmin);
Router.route('/dashboard/:id').get(AdminDashboard)
Router.route('/viewpatient').get(AdminAllPatient)
Router.route('/viewdoctor').get(AllDoctor)
Router.route('/updatedoctor/:id').put(UpdateDoctor)
Router.route('/deletedoctor/:id').delete(DeleteDoctor)
Router.route('/updatepatient/:id').put(UpdatePatient)
Router.route('/deletepatient/:id').delete(DeletePatient)
module.exports = Router