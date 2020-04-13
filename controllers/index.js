const StudentController = require('./StudentController');
const LessonController = require('./LessonController');
const UserController = require('./UserController');

module.exports = {
    StudentCtrl: new StudentController(),
    LessonCtrl: new LessonController(),
    UserCtrl: new UserController()
};
