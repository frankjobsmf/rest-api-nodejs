const { request, response } = require( 'express' );
const bcryptjs = require('bcryptjs');
const { validationResult } = require( 'express-validator' );

//user
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
        newUser
    });
};

const putUser = async( req=request, res=response ) => {

    const { id } = req.params;

    const { password, google, ...rest } = req.body;

    if ( password ){        
        //hash password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync( password, salt );
    };

    const user = await User.findByIdAndUpdate( id, rest );


    res.status(200).json({
        "msg": "putUser success",
        user
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