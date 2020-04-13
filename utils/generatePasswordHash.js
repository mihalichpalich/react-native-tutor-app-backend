const bcrypt = require('bcrypt');

const generatePasswordHash = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) return reject(err);

            resolve(hash);
        });
    });
};

module.exports = generatePasswordHash;