const mongoose = require('mongoose');
const {Schema} = mongoose;

const {generatePasswordHash} = require('../utils');

const UserSchema = new Schema(
    {
        id: String,
        login: {
            type: String,
            unique: true
        },
        phone: {
            type: String,
            unique: true
        },
        password: String,
        recovery_code: String
    },
    {
        timestamps: true
    }
);

UserSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

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
