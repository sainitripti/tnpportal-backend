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
    const {name, jobRole, jobLocation, package, eligibility, other} = req.body;

    //Sinple validation
    if(!name || !jobRole || !jobLocation || !package || !eligibility || !other){
        return res.status(400).json({msg: "Please enter all fields!"});
    }

    //Check for existing company
    Company.findOne({name})
        .then(company => {
            if(company) return res.status(400).json({msg: "Company already exist!"});

            const newCompany = new Company({
                name,
                jobRole,
                jobLocation,
                package,
                eligibility,
                other
            });

                    
            newCompany.save()
            .then(company => {

                res.json({
                    company: {
                        id: company.id,
                        name: company.name
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
                
            company.save().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
    });
})



module.exports = router;