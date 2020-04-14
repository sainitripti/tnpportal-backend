const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//Company model
const Company = require('../../models/Company');

//@route    GET api/companies
//desc      GET All Companies
//access    Private+admin
router.get('/', adminAuth, (req, res) => {
    Company.find()
        .then(companies => res.json(companies))
});

//@route    POST api/companies
//desc      create a new Company
//access    Public
router.post('/', (req, res) => {
    const {companyDetails, jobDetails, eligibility, selectionProcedure, requirements, otherInfoForStudents} = req.body;

    const companyName = req.body.companyDetails.companyName;
    const contactPerson = req.body.companyDetails.contactPerson;
    const phoneNumber = req.body.companyDetails.phoneNumber;
    const emailID = req.body.companyDetails.emailID;

    //Simple validation
    if(!companyDetails){
        return res.status(400).json({msg: "Please enter company details!"});
    }
    if(!companyName){
        return res.status(400).json({msg: "Please enter company name!"});
    }
    if(!contactPerson){
        return res.status(400).json({msg: "Please enter contact person!"});
    }
    if(!phoneNumber){
        return res.status(400).json({msg: "Please enter phone number!"});
    }
    if(!emailID){
        return res.status(400).json({msg: "Please enter emailID!"});
    }
    if(!jobDetails){
        return res.status(400).json({msg: "Please enter job details!"});
    }
    if(!eligibility){
        return res.status(400).json({msg: "Please enter elgibility criteria!"});
    }
    if(!selectionProcedure){
        return res.status(400).json({msg: "Please enter selection procedure!"});
    }
    if(!requirements){
        return res.status(400).json({msg: "Please enter your requirements from college!"});
    }
    if(!otherInfoForStudents){
        return res.status(400).json({msg: "Please enter any other information for students!"});
    }

    //Check for existing company
    Company.findOne({companyName})
        .then(company => {
            if(company) return res.status(400).json({msg: "Company already exist!"});

            const newCompany = new Company({
                companyDetails, 
                jobDetails, 
                eligibility, 
                selectionProcedure, 
                requirements, 
                otherInfoForStudents
            });

            newCompany.save()
            .then(company => res.json({ msg: "Job Announcement Form submitted successfully!" }))
            .catch(function(err) {
                console.log(err);
                return res.status(400).json({msg: "Failed to submit Job Annoucement Form!"});
            });                       
        })
});

module.exports = router;