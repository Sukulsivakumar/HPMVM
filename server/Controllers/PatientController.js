const PatientModel = require('../Models/Patient/Patient');

exports.Newpatient = async (req, res, next) => {
    try {
        const patient = await PatientModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Patient Added Successfully",
            patient
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; 
            return res.status(400).json({ success: false, field });
        } else {
            console.error(error);
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
};

exports.AdminAllPatient = async (req, res) => {
    try {
        const patient = await PatientModel.find();
        res.status(200).json({
            success: true,
            message: "All Patient",
            count: patient.length,
            patient
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}
exports.DoctorAllPatient = async (req, res) => {
    try {
        const patient = await PatientModel.find({Doctorid: req.params.id})
        res.status(200).json({
            success: true,
            message: "All Patient",
            count: patient.length,
            patient
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//Dashboard - http://localhost:8000/api/patient/dashboard
exports.PatientDashboard = async (req, res, next) => {
    try {
        const user = await PatientModel.findOne({ Userid: req.params.id });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Paient Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Patient Dashboard",
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.UpdatePatient = async(req,res) =>{
    try{
        await PatientModel.findOneAndUpdate({Userid: req.params.id},req.body);
        res.status(200).json({
            success: true,
            message: "Patient Updated Successfully"
        })
    }catch(error){
        res.json({
            success: false,
            message: "Something went wrong"
            })
    }
}


exports.DeletePatient = async (req,res)=>{
    try {
        await PatientModel.findOneAndDelete({Userid: req.params.id});
        res.status(200).json({
            success: true,
            message: "Patient Deleted Successfully"
            })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
            })
    }
}