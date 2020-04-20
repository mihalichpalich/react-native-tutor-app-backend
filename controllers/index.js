const StudentController = require('./StudentController');
const LessonController = require('./LessonController');
const UserController = require('./UserController');
const ProgramController = require('./ProgramController');

module.exports = {
    StudentCtrl: new StudentController(),
    LessonCtrl: new LessonController(),
    UserCtrl: new UserController(),
    ProgramCtrl: new ProgramController()
};
