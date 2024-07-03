const express = require('express');
const { PatientDashboard } = require('../Controllers/PatientController');
const Router = express.Router();

Router.route('/dashboard/:id').get(PatientDashboard)
module.exports = Router