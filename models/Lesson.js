const mongoose = require('mongoose');
const {Schema} = mongoose;

const LessonSchema = new Schema(
    {
        lessonNum: Number,
        unit: String,
        date: String,
        time: String,
        student: {type: Schema.Types.ObjectId, ref: "Student"},
    },
    {
        timestamps: true
    }
);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
