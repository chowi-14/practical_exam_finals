const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: String,
    couse: String,
    age: Number
})

module.exports = mongoose.model("Student", studentSchema)