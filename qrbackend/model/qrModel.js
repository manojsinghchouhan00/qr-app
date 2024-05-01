const mongoose = require("mongoose")

const qrSchema = new mongoose.Schema({
    name: String,
    fatherName: String,
    mobileNo: String,
    emergency: String,
    address: String,
    bloodGroup: String,
    insurance: String,
    companyName: String,
    insuranceName: String,
    insuranceNo: String,
    agentNo: String,
    expiryDate: String
})

module.exports = mongoose.model("qrData", qrSchema)
