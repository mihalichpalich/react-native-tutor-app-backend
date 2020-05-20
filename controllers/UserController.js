const {User} = require('../models');

function UserController() {
}

const signIn = async function(req, res) {
    const data = {
        email: req.body.email,
        googleID: req.body.googleID
    };

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

const getByEmail = async function(req, res) {
    const email = req.params.email;

    try {
        const user = await User.findOne({email: email}).exec();

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

UserController.prototype = {
    signIn,
    getByEmail
};

module.exports = UserController;