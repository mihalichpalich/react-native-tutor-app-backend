const mongoose = require('mongoose');
const {Schema} = mongoose;

const {generatePasswordHash} = require('../utils');

const UserSchema = new Schema(
    {
        id: String,
        phone: {
            type: String,
            unique: true
        },
        password: String,
        confirmation_code: String,
        confirmed: Boolean
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    generatePasswordHash(user.password)
        .then(hash => {
            user.password = String(hash);
            next();
        })
        .catch(err => {
            next(err);
        });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
