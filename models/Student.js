const mongoose = require('mongoose');
const {Schema} = mongoose;

const StudentSchema = new Schema({
    id: String,
    fullname: String,
    phone: String
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
