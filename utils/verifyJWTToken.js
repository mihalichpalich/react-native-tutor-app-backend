const jwt = require("jsonwebtoken");

const verifyJWTToken = function(token) {
    return (new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || "", (err, decodedData) => {
            if (err || !decodedData) {
                return reject(err);
            }

            resolve(decodedData);
        });
    }))
};

module.exports = verifyJWTToken;