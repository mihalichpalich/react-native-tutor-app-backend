const {check} = require('express-validator');

const validation = {
  create: [
      check('lessonNum').isInt({min: 1}),
      check('unit').isLength({min: 1}),
      check('date').isLength({min: 3, max: 50}),
      check('time').isLength({min: 3, max: 50}),
      check('student').isLength({min: 3, max: 50})
  ]
};

module.exports = validation;
