const mongoose = require('mongoose');
const {Schema} = mongoose;

const StudentSchema = new Schema(
    {
        id: String,
        fullname: String,
        phone: String
    },
    {
        timestamps: true
    }
);

StudentSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'student',
    justOne: false
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
