const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//Registration model
const Registration = require('../../models/Registration');

//@route    GET api/registrations
//desc      GET All registrations
//access    Private+Admin
router.get('/', auth, (req, res) => {
    Registration.find()
        .then(registrations => res.json(registrations))
});

//@route    GET api/registrations/:enrollmentNum
//desc      GET all registered drives for a student
//access    Private
router.get('/:enrollmentNum', auth, (req,res) => {
    const {enrollmentNum} = req.params;
    Registration.find({enrollmentNum})
    .then(registrations => res.json(registrations))
    .catch(err => res.status(404).json({success: false}));
});

//@route    POST api/registrations
//desc      Make new registration of a student for a company
//access    Private+
router.post('/', auth, (req, res) => {
    const {drive, enrollmentNum} = req.body;

    //Simple validation
    if(!drive) {
        return res.status(400).json({msg: "Please enter company drive name!"});
    }
    if(!enrollmentNum) {
        return res.status(400).json({msg: "Please enter student enrollment Number!"});
    }
   
    //Check for existing Registration
    Registration.findOne({'drive': drive, 'enrollmentNum': enrollmentNum})
        .then(registration => {
            if(registration) return res.status(400).json({msg: "You are already registered for this drive!"});

            const newRegistration = new Registration({
                drive,
                enrollmentNum
            });

                    
            newRegistration.save()
            .then(registration => res.json({ msg: "Registration successfully!" }))
            .catch(err => res.status(404).json({msg: "Registration failed!"}))                     
        })
});

//@route    DELETE api/registrations/
//desc      delete/ unregister student from a company
//access    Private
router.delete('/', auth, (req, res) => {
    const {drive, enrollmentNum} = req.body;
    //Simple validation
    if(!drive) {
        return res.status(400).json({msg: "Please provide company drive name!"});
    }
    if(!enrollmentNum) {
        return res.status(400).json({msg: "Please provide student enrollment Number!"});
    }

    //Check for existing Registration
    Registration.findOne({'drive': drive, 'enrollmentNum': enrollmentNum})
        .then(registration => registration.remove().then(() => res.json({ msg: "Student unregistered from drive!" })))
        .catch(err => res.status(404).json({ msg: "Failed to unregister student!" }));
})

module.exports = router;