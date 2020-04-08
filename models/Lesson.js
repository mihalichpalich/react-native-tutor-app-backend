const mongoose = require('mongoose');
const {Schema} = mongoose;

const LessonSchema = new Schema(
    {
        unit: String,
        date: String,
        time: String,
        rate_lesson: Number,
        rate_homework: Number,
        homework: String,
        student: {type: Schema.Types.ObjectId, ref: "Student"}
    },
    {
        timestamps: true
    }
);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
