const prescriptionModel = require('../Models/Patient/Prescription');


const generateUniqueId = (length) => {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.NewPrescription = async (req, res, next) => {
    try {
        const PrescriptionId = generateUniqueId(10);

        const PrescriptionData = {
            ...req.body,
            PrescriptionId
        };

        const prescription = await prescriptionModel.create(PrescriptionData);

        res.status(200).json({
            success: true,
            message: "Prescription Added Successfully",
            prescription
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


exports.AdminViewPrescription = async (req, res) => {
    try {
        const AdminPrescription = await prescriptionModel.find();
        res.status(200).json({
            success: true,
            AdminPrescription
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

exports.DoctorViewPrescription = async (req, res) => {
    try {
        const DoctorPrescription = await prescriptionModel.find({ doctorId: req.params.id });
        res.status(200).json({
            success: true,
            DoctorPrescription
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}
exports.PatientViewPrescription = async (req, res) => {
    try {
        const PatientPrescription = await prescriptionModel.find({ patientId: req.params.id });
        res.status(200).json({
            success: true,
            PatientPrescription
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}


exports.UpdatePrescription = async (req, res) => {
    try {
        await prescriptionModel.findOneAndUpdate({ patientId: req.params.id })
        res.status(200).json({
            success: true,
            message: "Prescription Updated Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

exports.DeletePrescription = async (req, res) => {
    try {
        await prescriptionModel.findOneAndDelete({ patientId: req.params.id })
        res.status(200).json({
            success: true,
            message: "Prescription Deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

exports.GetPrescription = async (req, res) => {
    try {
        const prescription = await prescriptionModel.findOne({ PrescriptionId: req.body.PrescriptionId });
        res.status(200).json({
            success: true,
            prescription
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}