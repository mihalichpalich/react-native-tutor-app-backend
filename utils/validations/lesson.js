const {check} = require('express-validator');

const validation = {
  create: [
      check('unit').isLength({min: 1}),
      check('date').isLength({min: 3, max: 50}),
      check('time').isLength({min: 3, max: 50}),
      check('rate_lesson').isInt({gt: -1, lt: 6}),
      check('rate_homework').isInt({gt: -1, lt: 6}),
      check('student').isLength({min: 3, max: 50})
  ],
  update: [
      check('unit').isLength({min: 1}),
      check('date').isLength({min: 3, max: 50}),
      check('time').isLength({min: 4, max: 5}),
      check('rate_lesson').isInt({gt: -1, lt: 6}),
      check('rate_homework').isInt({gt: -1, lt: 6}),
  ]
};

module.exports = validation;
