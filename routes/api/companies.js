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
//access    Private
router.get('/', auth, (req, res) => {
    Company.find()
        .then(companies => res.json(companies))
});

//@route    POST api/companies
//desc      create a new Company
//access    Private+Admin
router.post('/', adminAuth, (req, res) => {
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
                companyName,
                contactPerson,
                phoneNumber,
                emailID,
                jobDetails, 
                eligibility, 
                selectionProcedure, 
                requirements, 
                otherInfoForStudents
            });

                    
            newCompany.save()
            .then(company => {

                res.json({
                    company: {
                        id: company.id,
                        companyName: company.companyName
                    },
                    msg: {
                        success: true
                    }                      
                })
            })                     
        })
});

//@route    PUT api/companies/:id
//desc      update Company
//access    Private+Admin
router.put('/:id', adminAuth, (req, res) => {
    Company.findById(req.params.id, function(err, company) {
        if (!company)
            res.status(404).send("company not found");
        else
            company.name = req.body.name;
            company.jobRole = req.body.jobRole;
            company.jobLocation = req.body.jobLocation;
            company.package = req.body.package;
            company.eligibility = req.body.eligibility;
            company.other = req.body.other;
            company.companyDetails = req.body.companyDetails;
            company.jobDetails = req.body.jobDetails;
            company.eligibility = req.body.eligibility; 
            company.selectionProcedure = req.body.selectionProcedure;
            company.requirements = req.body.requirements;
            company.otherInfoForStudents = req.body.otherInfoForStudents;
                
            company.save().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
    });
})



module.exports = router;