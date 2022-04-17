const { request, response } = require( 'express' );
const bcryptjs = require('bcryptjs');
const { validationResult } = require( 'express-validator' );

//model User
const User = require('../models/user.model');

const getUser = ( req=request, res=response ) => {
    const query = req.query;
    //podemos desestructurar las propiedades que vienen en los query params
    const {
        q,
        name='Not name',
        age='Not age'
    } = query;

    res.status(200).json({
        "msg": "getUser success",
        q,
        name,
        age
    });
};

const postUser = async( req=request, res=response ) => {

    const body = req.body;

    const {
        name,
        email,
        password,
        img,
        state,
        google,
        role
    } = body;

    const userExists = await User.findOne({email});

    if ( userExists ) {
        res.status(200).json({
            msg: "Email already exists"
        });
        return ;    
    }

    //hash password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync( password, salt );

    const newUser = new User({
        name,
        email,
        password,
        img,
        state,
        google,
        role
    });

    newUser.password = hash;

    await newUser.save();

    res.status(200).json({
        "msg": "postUser User saved successfully",
    });
};

const putUser = ( req=request, res=response ) => {
    const query = req.query;
    //podemos desestructurar las propiedades que vienen en los query params
    const {
        q,
        name='Not name',
        age='Not age'
    } = query;

    res.status(200).json({
        "msg": "getUser success",
        q,
        name,
        age
    });
};

const deleteUser = ( req=request, res=response ) => {
    const query = req.query;
    //podemos desestructurar las propiedades que vienen en los query params
    const {
        q,
        name='Not name',
        age='Not age'
    } = query;

    res.status(200).json({
        "msg": "getUser success",
        q,
        name,
        age
    });
};


module.exports = {
    getUser,

    postUser,
    putUser,
    deleteUser
};