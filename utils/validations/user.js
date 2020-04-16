const {check} = require('express-validator');

const validation = {
    create: [
        check('phone').isLength({min: 11}),
        check('password').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{7,}$/, "i")
    ]
};

module.exports = validation;