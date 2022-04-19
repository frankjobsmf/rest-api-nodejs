const { request, response } = require( 'express' );
const bcryptjs = require('bcryptjs');
const { validationResult } = require( 'express-validator' );

//user
const User = require('../models/user.model');

const getUser = async ( req=request, res=response ) => {

    const query = { state: true };

    const { limit = 5, since = 0 } = req.query;
    // const total = await User.countDocuments(query);
    // const users = await User.find(query).skip( Number( since ) ).limit( Number( limit ) );

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip( Number( since ) ).limit( Number( limit ) )

    ])

    res.json({ total, users });

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

const deleteUser = async ( req=request, res=response ) => {
    const { id } = req.params;

    // await User.findByIdAndDelete( id );
    const userUpdateState = await User.findByIdAndUpdate( id, { state: false } );

    res.status(200).json({
        id,
        userUpdateState
    });
};


module.exports = {
    getUser,

    postUser,
    putUser,
    deleteUser
};