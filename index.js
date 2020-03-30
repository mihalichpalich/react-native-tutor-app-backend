const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const db = require('./core/db');
const {studentValidation, lessonValidation} = require('./utils/validations');
const {StudentCtrl, LessonCtrl} = require('./controllers');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/students', StudentCtrl.all);
app.get('/students/:id', StudentCtrl.show);
app.post('/students', studentValidation.create, StudentCtrl.create);
app.delete('/students/:id', StudentCtrl.remove);
app.patch('/students/:id', studentValidation.create, StudentCtrl.update);

app.get('/lesson', LessonCtrl.all);
app.post('/lesson', lessonValidation.create, LessonCtrl.create);
app.delete('/lesson/:id', LessonCtrl.remove);
app.patch('/lesson/:id', lessonValidation.update, LessonCtrl.update);

app.listen(3000, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Server run');
});
