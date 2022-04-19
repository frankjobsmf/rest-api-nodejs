const { Router } = require('express');
const { check } = require('express-validator');

//middlewares
const { validateFields } = require('../middlewares/validate-fields');

//helpers
const { isRoleValidate, validateEmailExists, findUserById } = require('../helpers/db-validators');

const router = Router();

const {
    getUser,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/user.controller');

router.get('/', getUser);
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters long').isLength({ min: 6 }),
    check('email', 'This email is not valid').isEmail(),
    check('email').custom( validateEmailExists ),
    // check('role', 'This role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValidate ),
    validateFields
], postUser);
router.put('/:id', [
    check('id', 'Id is not a Mongo Id').isMongoId(),
    check('id').custom( findUserById ),
    check('role').custom( isRoleValidate ),
    validateFields
], putUser);
router.delete('/:id', [
    check('id', 'Id is not a Mongo Id').isMongoId(),
    check('id').custom( findUserById ),
    validateFields
], deleteUser);

module.exports = router;