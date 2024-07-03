const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const doctorSchema = new mongoose.Schema({
    Userid:{
        type:String,
        required:[true, "User Id is requierd"],
        unique:true
    },
    Password:{
        type: String,
        required:[true, "Password is requierd"],
        minlength:[8, "Password must be atleast 8 characters long"],
        select:false
    },
    Name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [20, "Name must be at most 20 characters"],
    },
    Email:{
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please enter a valid email id"],
        uniqueP: true
    },
    Gender:{
        type:String,
        required:[true, "Gender is required"],
        enum:{values:["Male","Female","Other"]}
    },
    Aadhar:{
        type: Number,
        required: [true, "Aadhar is required"],
        length: [12, "Please enter a valid Aadhar number"],
        unique: true
    },
    Phone:{
        type: Number,
        required: [true, "Phone number is required"],
        length: [10, "please enter a valid phone number"],
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
        default: 'doctor'
    }
});

doctorSchema.pre('save', async function(next){
    if (!this.isModified('Password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
})

doctorSchema.methods.isValidPassword = async function (Password) {
    return await bcrypt.compare(Password, this.Password);
}


let doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel;