const StudentController = require('./StudentController');
const LessonController = require('./LessonController');

module.exports = {
    StudentCtrl: new StudentController(),
    LessonCtrl: new LessonController()
};
