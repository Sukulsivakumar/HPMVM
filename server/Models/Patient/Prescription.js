const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientId: {
        type: Number,
        required: true,
    },
    doctorId: {
        type: Number,
        requied: true
    },
    PrescriptionId:{
        type: Number,
    },
    name:{
        type: String,
        required: true
    },
    disease:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    Paid:{
        type: Boolean,
        default: false
    },
    tablets:[
        {
            tabletName:{
                type: String,
                required: true
            },
            count:{
                type: Number,
                required: true
            }
        }
    ]
})

let prescriptionModel = mongoose.model('prescription', prescriptionSchema)

module.exports = prescriptionModel;