const userValidator = (req, res, next) => {
  req.check('fullname', 'Fullname is required.').notEmpty();

  req
    .check('email', 'Email must be between 3 to 32 characters.')
    .isEmail()
    .withMessage('Invalid email')
    .isLength({
      min: 4,
      max: 32,
    })
    .normalizeEmail();
  req.check('birthday', 'Invalid birthday.').isISO8601().toDate();
  req.check('phone', 'Phone number is required.').notEmpty();

  req.check('password', 'Password is required.').notEmpty();
  req
    .check('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain number');
  req.check('address', 'Address is required.').notEmpty();
  //check for error
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({
      error: firstError,
    });
  }
  //process to next middleware
  next();
};

const resetPasswordValidator = (req, res, next) => {
  req.check('password', 'Password is required.').notEmpty();
  req
    .check('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain number');

  //check for error
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({
      error: firstError,
    });
  }
  //process to next middleware
  next();
};
export { userValidator, resetPasswordValidator };
