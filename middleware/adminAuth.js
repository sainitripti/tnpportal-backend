const config = require('config');
const jwt = require('jsonwebtoken');

//User model
const User = require('../models/User');

function adminAuth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    try{
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //Add user from payload
        req.user = decoded;
        User.findById(req.user.id)
        .then(user => {
            if(user.role !== "ADMIN"){
                return res.status(401).json({ msg: 'Not an admin, access denied'});
            }
            next();
        })
        .catch(err => res.status(404).json({success: false}));
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid!'});
    }
}

module.exports = adminAuth;