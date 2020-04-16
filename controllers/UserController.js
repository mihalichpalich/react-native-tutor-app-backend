const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const {User} = require('../models');
const createJWToken = require('../utils/createJWToken');
const {sendSMS} = require('../utils');

function UserController() {
}

const create = function(req, res) {
    const errors = validationResult(req);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const confirmationCode = getRandomInt(1000, 9999);

    const data = {
        phone: req.body.phone,
        password: req.body.password,
        confirmation_code: confirmationCode,
        confirmed: false
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

const getByPhone = async function(req, res) {
    const phone = req.params.phone;

    try {
        const user = await User.findOne({phone: phone}).exec();

        res.json({
            status: true,
            data: {user}
        });
    } catch (e) {
        return res.status(404).json({
            status: false,
            message: 'USER_NOT_FOUND'
        });
    }
};

const getConfirmCode = function (req, res) {
    const id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user.confirmation_code);

        sendSMS({
            number: user.phone,
            time: Date.now(),
            text: `Код подтверждения вашего аккаунта: ${user.confirmation_code}`
        }).then(({data}) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    });
};

const confirm = function (req, res) {
    const id = req.params.id;

    User.findOneAndUpdate({_id: id}, {confirmed: true}, {new: true}, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    });
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

const login = async function(req, res) {
    const errors = validationResult(req);

    const postData = {
        phone: req.body.phone,
        password: req.body.password
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.array()
        });
    }

    User.findOne({phone: postData.phone, confirmed: true}, (err, user) => {
        if (err || !user) {
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
            res.status(404).json({
                status: 'error',
                message: 'incorrect password'
            });
        }
    });

};

UserController.prototype = {
    create,
    updatePasswordInputPhone,
    login,
    show,
    getConfirmCode,
    confirm,
    getByPhone
};

module.exports = UserController;