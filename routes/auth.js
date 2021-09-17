/*
    Users routes / Auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {loginUser, createUser, revalidateToken} = require('../controllers/auth')
const {fieldValidator} = require('../middlewares/fields-validator')
const {validateJWT} = require('../middlewares/validate-jwt')

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

router.post(
    '/new',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        fieldValidator
    ],
    createUser
);

router.get('/renew', validateJWT, revalidateToken)

module.exports = router;