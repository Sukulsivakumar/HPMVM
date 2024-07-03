const express= require('express');
const Router = express.Router();

const {login} = require('../Controllers/Authcontroller');
const { GetPrescription } = require('../Controllers/PrescriptionController');

Router.route('/login').post(login)
Router.route('/patient').post(GetPrescription)

module.exports = Router