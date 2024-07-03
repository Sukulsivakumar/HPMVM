const adminModel = require('../Models/Admin')
const doctorModel = require('../Models/Doctor')
const patientModel = require('../Models/Patient/Patient')

exports.login = async (req, res) => {
    try {
        // Checking for Admin
        let user = await adminModel.findOne({ Userid: req.body.Userid }).select('+Password');
        if (user) {
            if (await user.isValidPassword(req.body.Password)) {
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    user
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
        }

        //checking for the doctor
        user = await doctorModel.findOne({ Userid: req.body.Userid }).select('+Password');
        if (user) {
            if (await user.isValidPassword(req.body.Password)) {
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    user
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
        }

        // checking for the patient
        user = await patientModel.findOne({ Userid: req.body.Userid }).select('+Password');
        if (user) {
            if (await user.isValidPassword(req.body.Password)) {
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    user
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
        }

        // User Not found
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials or User Not Found"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Sevrer Error"
        });
    }
}