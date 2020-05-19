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

UserController.prototype = {
    signIn
};

module.exports = UserController;