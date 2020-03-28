const {validationResult} = require('express-validator');
const {Lesson, Student} = require('../models');

function LessonController() {
}

const create = async function(req, res) {
    const errors = validationResult(req);

    const data = {
        student: req.body.student,
        lessonNum: req.body.lessonNum,
        unit: req.body.unit,
        date: req.body.date,
        time: req.body.time
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.array()
        });
    }

    const student = await Student.findOne({_id: data.student});

    if (!student) {
        return res.status(404).json({
            status: false,
            message: 'PATIENT_NOT_FOUND'
        });
    }

    Lesson.create(data, function (err, doc) {
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

const remove = function (req, res) {
    const id = req.query.id;
    Student.deleteOne({_id: id}, (err) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }

        res.json({
            status: "success"
        });
    });
};

const all = function (req, res) {
    Lesson.find({}).populate('student').exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }

        res.json({
            status: "success",
            data: docs
        });
    });
};

LessonController.prototype = {
    all,
    create,
    remove
};

module.exports = LessonController;
