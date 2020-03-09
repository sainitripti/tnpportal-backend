const express = require('express');
const router = express.Router();

//User model
const User = require('../../models/User');

//@route    GET api/users
//desc      GET All Users
//access    Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
});

//@route    POST api/users
//desc      create a new User
//access    Public
router.post('/', (req, res) => {
    const newUser = new User({
        enrollmentNum: req.body.enrollmentNum,
        password: req.body.password,
        role: req.body.role
    });
    
    newUser.save().then(user => res.json(user));
});

//@route    DELETE api/users/:id
//desc      delete User
//access    Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

//@route    PUT api/users/:id
//desc      update User
//access    Public
router.put('/:id', (req, res) => {
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