const {Program, User} = require('../models');

function ProgramController() {
}

const create = async function(req, res) {
    const data = {
        name: req.body.name,
        user: req.body.user
    };

    Program.create(data, function (err, doc) {
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
    const programId = req.params.id;

    const data = {
        name: req.body.name,
        user: req.body.user
    };

    Program.updateOne(
        {_id: programId},
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
                    message: "PROGRAM_NOT_FOUND"
                });
            }

            res.json({
                status: true,
                data: doc
            });
        })
};

const remove = async function (req, res) {
    const programId = req.params.id;

    try {
        await Program.findOne({ _id: programId });
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'LESSON_NOT_FOUND'
        });
    }

    Program.deleteOne({_id: programId}, (err) => {
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
    const userId = req.params.user_id;

    Program.find({user: userId}, function (err, doc) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }

        res.json({
            status: "success",
            data: doc
        })
    });
};

ProgramController.prototype = {
    create,
    update,
    remove,
    all
};

module.exports = ProgramController;