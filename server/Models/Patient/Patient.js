const mongoose =  require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const patientSchema  =  new mongoose.Schema({
    Userid:{
        type: String,
        required: [true,"User ID is required"],
        unique: true
    },
    Password:{
        type: String,
        required: [true,"Password is required"],
        minlength: [8,"Password must be at least 8 characters long"],
        maxlength: [12,"Password must be at most 20 characters long"],
        validate:[validator.isAlphanumeric, "Password should be mix of letters and numbers"],
        select: false
    },
    Name:{
        type: String,
        required: [true,"Name is required"],
        minlength: [3,"Name must be at least 3 characters long"],
        maxlength: [20,"Name must be at most 20 characters long"],
    },
    Doctorid:{
        type: String,
        required: [true,"Doctor ID is required"],
    },
    Gender:{
        type: String,
        required: [true,"Gender is required"],
        enum:{
            values:[
                "Male",
                "Female",
                "Other"
            ]
        }
    },
    Aadhar:{
        type: Number,
        required: [true,"Aadhar Number is required"],
        length: [12, "Please enter a valid Aadhar Number"],
        unique: true
    },
    Phone:{ 
        type: Number,
        required: [true,"Phone Number is required"],
        length: [10, "Please enter a valid Phone Number"],
        unique: true
    },
    Address:{
        type: String,
        required: [true, "Address is required"],
    },
    Pincode:{
        type: String,
        required: [true, "Pincode is required"],
        length: [6, "Please enter a valid pincode"]
    },
    Role:{
        type: String,
        required: [true, "Role is required"],
        default: 'patient'
    }
});

patientSchema.pre('save', async function(next){
    if (!this.isModified('Password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
})

patientSchema.methods.isValidPassword = async function (Password) {
    return await bcrypt.compare(Password, this.Password);
}

let patientModel = mongoose.model('Patient', patientSchema)

module.exports = patientModel;