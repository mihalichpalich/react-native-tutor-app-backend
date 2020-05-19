const express = require('express');
const {studentValidation, lessonValidation} = require('../utils/validations');
const {StudentCtrl, LessonCtrl, UserCtrl, ProgramCtrl} = require('../controllers');

const createRoutes = app => {
    app.use(express.json());

    app.post('/user/sigh_in', UserCtrl.signIn);

    app.post('/program', ProgramCtrl.create);
    app.patch('/program/:id', ProgramCtrl.update);
    app.delete('/program/:id', ProgramCtrl.remove);
    app.get('/program/:user_id', ProgramCtrl.all);

    app.get('/students/all/:user_id', StudentCtrl.all);
    app.get('/students/:student_id', StudentCtrl.show);
    app.get('/students/getbyphone/:phone', StudentCtrl.getByPhone);
    app.post('/students', studentValidation.create, StudentCtrl.create);
    app.delete('/students/:student_id', StudentCtrl.remove);
    app.patch('/students/:student_id', studentValidation.create, StudentCtrl.update);

    app.get('/lesson/:user_id', LessonCtrl.all);
    app.get('/lesson/:id', LessonCtrl.show);
    app.post('/lesson', lessonValidation.create, LessonCtrl.create);
    app.delete('/lesson/:id', LessonCtrl.remove);
    app.patch('/lesson/:id', lessonValidation.update, LessonCtrl.update);
};

module.exports = createRoutes;

