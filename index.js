const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const db = require('./core/db');
const createRoutes = require('./core/routes');

dotenv.config();

const app = express();

app.use(cors());

createRoutes(app);

app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Server run');
});
