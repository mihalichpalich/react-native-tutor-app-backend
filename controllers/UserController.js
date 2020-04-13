const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const {User} = require('../models');
const createJWToken = require('../utils/createJWToken');

function UserController() {
}

const create = function(req, res) {
    const errors = validationResult(req);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const recoveryCode = getRandomInt(1000, 9999);

    const data = {
        login: req.body.login,
        phone: req.body.phone,
        password: req.body.password,
        recovery_code: recoveryCode
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.array()
        });
    }

    User.create(data, function (err, doc) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }

        res.status(201).json({
            status: true,
            data: doc
        });
    })
};

const show = function(req, res) {
    const id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    });
};

const updatePasswordInputPhone = async function(req, res) {
    const userId = req.params.id;
    const errors = validationResult(req);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const recoveryCode = getRandomInt(1000, 9999);

    const data = {
        phone: req.body.phone,
        recovery_code: recoveryCode
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.array()
        });
    }

    User.updateOne(
        {_id: userId},
        {$set: data},
        function (err, doc) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: "USER_NOT_FOUND"
                });
            }

            res.json({
                status: true
            });
        })
};

const login = function(req, res) {
    const postData = {
        login: req.body.login,
        password: req.body.password
    };

    User.findOne({login: postData.login}, (err, user) => {

        if (err) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (bcrypt.compareSync(postData.password, user.password)) {
            const token = createJWToken(user);
            res.json({
                status: 'success',
                token
            });
        } else {
            res.json({
                status: 'error',
                message: 'incorrect password or email'
            });
        }
    });

};

UserController.prototype = {
    create,
    updatePasswordInputPhone,
    login,
    show
};

module.exports = UserController;