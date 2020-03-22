const {validationResult} = require('express-validator');
const {Student} = require('../models');

function StudentController() {
}

const create = function(req, res) {
    const errors = validationResult(req);

    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.array()
        });
    }

    Student.create(data, function (err, doc) {
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

const all = function (req, res) {
    Student.find({}, function (err, docs) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }

        res.json({
            status: true,
            data: docs
        });
    });
};

StudentController.prototype = {
    all,
    create
};

module.exports = StudentController;
