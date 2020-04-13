const express = require('express');
const { verifyJWTToken } = require("../utils");

const checkAuth = function(req, res, next) {
    if (req.path === "/user/login" || req.path === "/user/registration") {
        return next();
    }

    const token = req.headers.token;

    verifyJWTToken(token)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.status(403).json({ message: "Invalid auth token provided." });
        });
};

module.exports = checkAuth;