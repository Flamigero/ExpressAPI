const {response} = require('express');
const {generateJWT} = require('../helpers/jwt')

const loginUser = async(req, res=response) => {
    const {email, password} = req.body;
    const user = {
        id: 123,
        name: 'username',
        email,
        password
    }

    try {
        // Generate JWT
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
    loginUser
}