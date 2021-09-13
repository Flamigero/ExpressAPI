/*
    Users routes / Auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {loginUser} = require('../controllers/auth')
const {fieldValidator} = require('../middlewares/fields-validator')

const router = Router();

router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'The password must be 6 characters long').isLength({min:6}),
        fieldValidator
    ],
    loginUser
);

module.exports = router;