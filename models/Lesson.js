const mongoose = require('mongoose');
const {Schema} = mongoose;

const LessonSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: "User"},
        student: {type: Schema.Types.ObjectId, ref: "Student"},
        program_name: String,
        unit: String,
        date: String,
        time: String,
        rate_lesson: Number,
        rate_homework: Number,
        homework: String

    },
    {
        timestamps: true
    }
);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
