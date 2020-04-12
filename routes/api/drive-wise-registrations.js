const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//Drive Wise Registration model
const DriveWiseRegistration = require('../../models/DriveWiseRegistration');

//@route    GET api/drive-wise-registrations
//desc      GET All drive wise registrations
//access    Private
router.get('/', auth, (req, res) => {
    DriveWiseRegistration.find()
        .then(drivewiseregistrations => res.json(drivewiseregistrations))
});

//@route    POST api/drive-wise-registrations
//desc      Make new registration of a student for a company
//access    Private
router.post('/', auth, (req, res) => {
    let {drive, arEnrollmentNum} = req.body;

    //Simple validation
    if(!drive) {
        return res.status(400).json({msg: "Please enter company drive name!"});
    }
    if(!arEnrollmentNum) {
        return res.status(400).json({msg: "Please enter array of student enrollment Number!"});
    }
    //Check if drive exist or create drive
    DriveWiseRegistration.findOne({drive})
    .then(driveregistrations => {
        if(driveregistrations) {
            let index = driveregistrations.arEnrollmentNum.indexOf(arEnrollmentNum[0]);
            if(index !== -1){
                res.status(404).json({msg: "You have already registered for this drive"});
            }
            driveregistrations.arEnrollmentNum = driveregistrations.arEnrollmentNum.concat(arEnrollmentNum);

            driveregistrations.save()
            .then(registrations => res.json({ msg: "Drive registration successful!" }))
            .catch(err => res.status(404).json({msg: "Drive registration failed!"})) 
        
        }
        else {
            const newDriveRegistration = new DriveWiseRegistration({
                drive,
                arEnrollmentNum
            });

            newDriveRegistration.save()
            .then(registrations => res.json({ msg: "Drive Registration successful!" }))
            .catch(err => res.status(404).json({msg: "Drive Registration failed!"})) 
        }
    })
});


//@route    PUT api/drive-wise-registrations
//desc      Unregistration a student from a company
//access    Private
//@route    POST api/drive-wise-registrations
//desc      Make new registration of a student for a company
//access    Private
router.put('/', auth, (req, res) => {
    let {drive, enrollmentNum} = req.body;

    //Simple validation
    if(!drive) {
        return res.status(400).json({msg: "Please enter company drive name!"});
    }
    if(!enrollmentNum) {
        return res.status(400).json({msg: "Please enter student enrollment Number!"});
    }
    //Check if drive exist or create drive
    DriveWiseRegistration.findOne({drive})
    .then(driveregistrations => {
        if(!driveregistrations) {
            res.status(404).json({msg: "Drive not found!"});
        }
        else {
            let index = driveregistrations.arEnrollmentNum.indexOf(enrollmentNum);
            if(index == -1){
                res.status(404).json({msg: "You haven't registered for this drive"});
            }
            else{
                driveregistrations.arEnrollmentNum.splice(index, 1);
                driveregistrations.save()
                .then(registrations => res.json({ msg: "Unregistration from drive successfully!" }))
                .catch(err => res.status(404).json({msg: "Failed to unregister from drive!"}))
            }
        }
    })
});

module.exports = router;