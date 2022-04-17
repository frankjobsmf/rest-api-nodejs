const { Router } = require('express');
const { check } = require('express-validator');

//middlewares
const { validateFields } = require('../middlewares/validate-fields');

const Role = require('../models/role.model');

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
    // check('role', 'This role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( async(role = '') => {


            const roleExists = await Role.findOne({role})
            console.log(roleExists);

            if ( !roleExists ) {
                throw new Error(`The role ${role}, is not registered in database`);
            }
    }),
    validateFields
], postUser);

module.exports = router;