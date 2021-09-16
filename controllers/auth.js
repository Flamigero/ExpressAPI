const {response} = require('express');
const bcrypt = require('bcryptjs')
const {generateJWT} = require('../helpers/jwt')
const User = require('../models/User')

const createUser = async(req, res=response) => {
    const {email, password} = req.body;

    try {
        /// Search if user exist
        let usuario = await User.findOne({email});

        if(usuario)
        {
            return res.status(400).json({
                ok: false,
                msg: 'A user exists with this email'
            })
        }

        /// Create user
        user = new User(req.body);

        /// Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        /// Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please speak to the administrator'
        })
    }
}

const loginUser = async(req, res=response) => {
    const {email, password} = req.body;
    const user = {
        id: 123,
        name: 'username',
        email,
        password
    }

    try {
        /// Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please speak to the administrator'
        })
    }
};

module.exports = {
    loginUser,
    createUser
}