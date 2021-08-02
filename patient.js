const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const patientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    }


},{timestamps:true})

const Patient = mongoose.model('patient', patientSchema)

module.exports = {Patient}