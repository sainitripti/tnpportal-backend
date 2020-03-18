const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//User model
const User = require('../../models/User');

//@route    GET api/users
//desc      GET All Users
//access    Private+Admin
router.get('/', adminAuth, (req, res) => {
    User.find()
        .then(users => res.json(users))
});

//@route    POST api/users
//desc      create a new User
//access    Public
router.post('/', (req, res) => {
    const {enrollmentNum, password, role} = req.body;

    //Sinple validation
    if(!enrollmentNum || !password || !role){
        return res.status(400).json({msg: "Please enter all fields!"});
    }

    //Check for existing user
    User.findOne({enrollmentNum})
        .then(user => {
            if(user) return res.status(400).json({msg: "User already exist!"});

            const newUser = new User({
                enrollmentNum,
                password,
                role
            });

            //Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                jwtSecret,
                                { expiresIn: 3600 },
                                (err, token) => {                        
                                    if(err) throw err;
                                    res.json({
                                        token,  //equivalent to token: token
                                        user: {
                                            id: user.id,
                                            enrollmentNum: user.enrollmentNum,
                                            role: user.role
                                        }                      
                                    })
                                }
                            )                     
                        });
                })
            })
        })
    
    
    
});

//@route    DELETE api/users/:id
//desc      delete User
//access    Private+Admin
router.delete('/:id', adminAuth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

//@route    PUT api/users/:id
//desc      update User
//access    Private
router.put('/:id', auth, (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("user not found");
        else
            user.enrollmentNum = req.body.enrollmentNum;
            user.password = req.body.password;
            user.role = req.body.role;

            user.save().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
    });
})



module.exports = router;