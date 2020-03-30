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

const update = async function(req, res) {
    const studentId = req.params.id;
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

    Student.updateOne(
        {_id: studentId},
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
                    message: "STUDENT_NOT_FOUND"
                });
            }

            res.json({
                status: true
            });
    })
};

const remove = async function (req, res) {
    const id = req.params.id;

    try {
        await Student.findOne({ _id: id });
    } catch (e) {
            return res.status(404).json({
                success: false,
                message: 'STUDENT_NOT_FOUND'
            });
    }

    Student.deleteOne({_id: id}, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        res.json({
            status: "success"
        });
    });
};

const show = async function(req, res) {
    const id = req.params.id;

    try {
        const student = await Student.findById(id).populate('lessons').exec();

        res.json({
            status: true,
            data: {...student._doc, lessons: student.lessons}
        });
    } catch (e) {
        return res.status(404).json({
            status: false,
            message: 'STUDENT_NOT_FOUND'
        });
    }
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
    create,
    update,
    remove,
    show
};

module.exports = StudentController;
