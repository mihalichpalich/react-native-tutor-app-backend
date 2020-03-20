const express = require('express');
const cors = require('cors');

const db = require('./core/db');
const studentValidation = require('./utils/validations/student');
const {StudentCtrl} = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/students', StudentCtrl.all);
app.post('/students', studentValidation.create, StudentCtrl.create);

app.listen(3000, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Server run');
});
