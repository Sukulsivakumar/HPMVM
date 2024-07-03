const doctorModel = require('../Models/Doctor')

exports.AddDoctor = async (req, res, next) => {
    try {
        const doctor = await doctorModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Doctor Added Successfully",
            doctor
        })
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; // Extract field name from error object
            return res.status(400).json({ success: false, field });
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


//Dashboard - http://localhost:8000/api/doctor/dashboard
exports.DoctorDashboard = async (req, res, next) => {
    try {
        const user = await doctorModel.findOne({ Userid: req.params.id });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Doctor Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Doctor Dashboard",
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.AllDoctor = async (req, res, next) => {
    try {
        const doctor = await doctorModel.find();
        res.status(200).json({
            success: true,
            count: doctor.length,
            doctor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.UpdateDoctor = async (req, res) => {
    try {
        await doctorModel.findOneAndUpdate({ Userid: req.params.id }, req.body);
        res.status(200).json({
            success: true,
            message: "Doctor Updated Successfully"
        })
    } catch {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.DeleteDoctor = async (req, res) => {
    try {
        await doctorModel.findOneAndDelete({ Userid: req.params.id });
        res.status(200).json({
            success: true,
            message: "Doctor Deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}