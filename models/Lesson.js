const mongoose = require('mongoose');
const {Schema} = mongoose;

const LessonSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: "Student"},
        lessonNum: Number,
        unit: String,
        date: String,
        time: String
    },
    {
        timestamps: true
    }
);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
