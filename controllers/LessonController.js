const {validationResult} = require('express-validator');
const dayjs = require('dayjs');
const {Lesson, Student} = require('../models');

const {sendSMS} = require('../utils');

function LessonController() {
}

const create = async function(req, res) {
    const errors = validationResult(req);
    let student;

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
        student = await Student.findOne({_id: data.student});
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: "STUDENT_NOT_FOUND"
        });
    }

    Lesson.create(data, function (err, doc) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }

        const delayedTime = dayjs(
            `${data.date
                .split('.')
                .reverse()
                .join('.')}T${data.time}`)
            .subtract(1, 'minute')
            .unix();

        sendSMS({
            number: student.phone,
            time: delayedTime,
            text: `Добрый день, ${student.fullname}! Сегодня в ${data.time} у вас урок`
        }).then(({data}) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

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
            status: "success",
            data: docs
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
