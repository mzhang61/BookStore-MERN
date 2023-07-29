exports.userSignupValidator = (req, res, next) => {
    //validator module check
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min:4,
            max:32
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({min: 6})
        //if length smaller than 6, withMessage will print out
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage("password must contain a number");
        const errors = req.validationErrors();
        if (errors) {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({ error: firstError });
    }
    //everytime u create a middleware, u need to have next
    next();
};