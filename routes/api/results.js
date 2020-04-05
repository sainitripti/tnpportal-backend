const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//Result model
const Result = require('../../models/Result');

//@route    GET api/results
//desc      GET All Results
//access    Private
router.get('/', auth, (req, res) => {
    Result.find()
        .then(results => res.json(results))
});

//@route    POST api/results
//desc      create a new Result
//access    Private+Admin
router.post('/', adminAuth, (req, res) => {
    const {companyName, dateOfAnnouncement, numTotalSelects, numIntern, numFTE, ctcIntern, ctcFTE, isMassRecruitment, arIntern, arFTE, profile} = req.body;

    //Sinple validation
    if(!companyName) {
        return res.status(400).json({msg: "Please enter company name!"});
    }
    if(!dateOfAnnouncement) {
        return res.status(400).json({msg: "Please enter date of announcement!"});
    }
    if(!numTotalSelects) {
        return res.status(400).json({msg: "Please enter number of total selects!"});
    }
    if(!numIntern) {
        return res.status(400).json({msg: "Please enter number of interns!"});
    }
    if(!numFTE) {
        return res.status(400).json({msg: "Please enter number of FTE!"});
    }
    if(!ctcIntern) {
        return res.status(400).json({msg: "Please enter CTC for interns!"});
    }
    if(!ctcFTE) {
        return res.status(400).json({msg: "Please enter CTC for FTE!"});
    }
    if(isMassRecruitment===null) {
        return res.status(400).json({msg: "Please enter if it is a mass recruitment or not!"});
    }
    if(!profile) {
        return res.status(400).json({msg: "Please enter job profile!"});
    }
    
    //Check for existing Result
    Result.findOne({companyName})
        .then(result => {
            if(result) return res.status(400).json({msg: "Result for this company already exist!"});

            const newResult = new Result({
                companyName,
                dateOfAnnouncement,
                numTotalSelects,
                numIntern,
                numFTE,
                ctcIntern,
                ctcFTE,
                isMassRecruitment,
                arIntern,
                arFTE,
                profile
            });

                    
            newResult.save()
            .then(result => res.json({ msg: "Result added successfully!" }))
            .catch(err => res.status(404).json({msg: "Failed to add result!"}))                     
        })
});

//@route    PUT api/results/:id
//desc      update Result
//access    Private+Admin
router.put('/:id', adminAuth, (req, res) => {
    Result.findById(req.params.id, function(err, result) {
        if (!result)
            res.status(404).send("result not found");
        else
            result.companyName = req.body.companyName;
            result.dateOfAnnouncement = req.body.dateOfAnnouncement;
            result.numTotalSelects = req.body.numTotalSelects;
            result.numIntern = req.body.numIntern;
            result.numFTE = req.body.numFTE;
            result.ctcIntern = req.body.ctcIntern;
            result.ctcFTE = req.body.ctcFTE;
            result.isMassRecruitment = req.body.isMassRecruitment;
            result.arIntern = req.body.arIntern;
            result.arFTE = req.body.arFTE;
            result.profile = req.body.profile;
                
            result.save().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
    });
})


//@route    DELETE api/results/:id
//desc      delete Result
//access    Private+Admin
router.delete('/:id', adminAuth, (req, res) => {
    Result.findById(req.params.id)
        .then(result => result.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;