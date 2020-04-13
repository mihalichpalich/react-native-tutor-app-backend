const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const db = require('./core/db');
const {studentValidation, lessonValidation, userValidation} = require('./utils/validations');
const {StudentCtrl, LessonCtrl, UserCtrl} = require('./controllers');
const checkAuth = require('./middlewares/checkAuth');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(checkAuth);

app.get('/user/:id', UserCtrl.show);
app.post('/user/registration', userValidation.create, UserCtrl.create);
app.post('/user/login', UserCtrl.login);
app.patch('/user/:id', userValidation.create, UserCtrl.updatePasswordInputPhone);

app.get('/students/all/:user_id', StudentCtrl.all);
app.get('/students/:student_id', StudentCtrl.show);
app.get('/students/getbyphone/:phone', StudentCtrl.getByPhone);
app.post('/students/:user_id', studentValidation.create, StudentCtrl.create);
app.delete('/students/:student_id', StudentCtrl.remove);
app.patch('/students/:student_id', studentValidation.create, StudentCtrl.update);

app.get('/lesson', LessonCtrl.all);
app.get('/lesson/:id', LessonCtrl.show);
app.post('/lesson', lessonValidation.create, LessonCtrl.create);
app.delete('/lesson/:id', LessonCtrl.remove);
app.patch('/lesson/:id', lessonValidation.update, LessonCtrl.update);

app.listen(3000, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Server run');
});
