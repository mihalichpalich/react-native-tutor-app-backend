const express = require('express');
const cors = require('cors');

const db = require('./core/db');
const {studentValidation, lessonValidation} = require('./utils/validations');
const {StudentCtrl, LessonCtrl} = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/students', StudentCtrl.all);
app.post('/students', studentValidation.create, StudentCtrl.create);

app.get('/lesson', LessonCtrl.all);
app.post('/lesson', lessonValidation.create, LessonCtrl.create);
app.delete('/lesson/:id', lessonValidation.create, LessonCtrl.remove);

app.listen(3000, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Server run');
});
