const express = require('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser');
const AuthRoute = require('./Routes/Auth');
const AdminRoute = require('./Routes/Admin');
const DoctorRoute = require('./Routes/Doctor');
const PatientRoute = require('./Routes/Patient');
const PrescriptionRoute = require('./Routes/Prescription');

app.use(cors());
app.use(express.json());
app.use(cookieparser());

app.use('/api',AuthRoute);
app.use('/api/admin',AdminRoute)
app.use('/api/doctor',DoctorRoute)
app.use('/api/patient',PatientRoute)
app.use('/api/prescription',PrescriptionRoute)


module.exports = app;