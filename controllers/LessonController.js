const {validationResult} = require('express-validator');
const {Lesson, Student} = require('../models');

function LessonController() {
}

const create = async function(req, res) {
    const errors = validationResult(req);

    const data = {
        student: req.body.student,
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

    try {
        await Student.findOne({_id: data.student});
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: "STUDENT_NOT_FOUND"
        });
    }

    const student = await Student.findOne({_id: data.student});

    if (!student) {
        return res.status(404).json({
            status: false,
            message: 'STUDENT_NOT_FOUND'
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
            status: true
        });
    })
};

const update = async function(req, res) {
    const lessonId = req.params.id;
    const errors = validationResult(req);

    const data = {
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

    Lesson.updateOne(
        {_id: lessonId},
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
                    message: "LESSON_NOT_FOUND"
                });
            }

            res.json({
                status: true,
                data: doc
            });
    })
};

const remove = async function (req, res) {
    const id = req.params.id;

    try {
        await Lesson.findOne({ _id: id });
    } catch (e) {
            return res.status(404).json({
                success: false,
                message: 'LESSON_NOT_FOUND'
            });
    }

    Lesson.deleteOne({_id: id}, (err) => {
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

const all = function (req, res) {
    Lesson.find({}).populate('student').exec(function (err, docs) {
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

LessonController.prototype = {
    all,
    create,
    remove,
    update
};

module.exports = LessonController;
