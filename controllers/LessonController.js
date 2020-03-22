const {validationResult} = require('express-validator');
const {Lesson} = require('../models');

function LessonController() {
}

const create = function(req, res) {
    const errors = validationResult(req);

    const data = {
        student: req.body.studentId,
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

const all = function (req, res) {
    Lesson.find({}).populate('student').exec(function (err, docs) {
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

LessonController.prototype = {
    all,
    create
};

module.exports = LessonController;
