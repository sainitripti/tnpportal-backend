const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//Job model
const Job = require('../../models/Job');

//@route    GET api/jobs
//desc      GET All jobs
//access    Private
router.get('/', auth, (req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
});

//@route    POST api/jobs
//desc      create a new Job
//access    Private+Admin
router.post('/', adminAuth, (req, res) => {
    const {drive, profile, domain, role, location, description, targetBatchYear, targetCourses, visitDate, compensationOffered, 
        eligibilityCriteria, selectionProcedure, otherInfoForStudents, lastDateToRegister, dateOfJobPosting} = req.body;

    //Simple validation
    if(!drive){
        return res.status(400).json({msg: "Please enter drive name!"});
    }   
    if(!profile) {
        return res.status(400).json({msg: "Please enter job profile!"});
    }
    if(!domain) {
        return res.status(400).json({msg: "Please enter job domain!"});
    }
    if(!role) {
        return res.status(400).json({msg: "Please enter job role!"});
    }
    if(!location) {
        return res.status(400).json({msg: "Please enter job location!"});
    }
    if(!description) {
        return res.status(400).json({msg: "Please enter job description!"});
    }
    if(!targetBatchYear) {
        return res.status(400).json({msg: "Please enter target batch year!"});
    }
    if(!targetCourses) {
        return res.status(400).json({msg: "Please enter target courses!"});
    }
    if(!visitDate) {
        return res.status(400).json({msg: "Please enter visit date!"});
    }
    if(!compensationOffered) {
        return res.status(400).json({msg: "Please enter compensation!"});
    }
    if(!eligibilityCriteria) {
        return res.status(400).json({msg: "Please enter eligibility criteria!"});
    }
    if(!selectionProcedure){
        return res.status(400).json({msg: "Please enter selection procedure!"});
    }   
    if(!otherInfoForStudents){
        return res.status(400).json({msg: "Please enter other info for students!"});
    }   
    if(!lastDateToRegister) {
        return res.status(400).json({msg: "Please enter last date to register!"});
    }
    if(!dateOfJobPosting) {
        return res.status(400).json({msg: "Please enter date of job posting!"});
    }

    //Check for existing Job
    Job.findOne({drive})
        .then(job => {
            if(job) return res.status(400).json({msg: "Job drive already exist!"});

            const newJob = new Job({
                drive, 
                profile, 
                domain, 
                role, 
                location, 
                description, 
                targetBatchYear, 
                targetCourses, 
                visitDate, 
                compensationOffered, 
                eligibilityCriteria, 
                selectionProcedure,
                otherInfoForStudents, 
                lastDateToRegister, 
                dateOfJobPosting
            });
                    
            newJob.save()
            .then(job => {

                res.json({
                    job: {
                        id: job.id,
                        drive: job.drive
                    },
                    msg: {
                        success: true
                    }                      
                })
            })                     
        })
});

//@route    PUT api/jobs/:id
//desc      update Job
//access    Private+Admin
router.put('/:id', adminAuth, (req, res) => {
    Job.findById(req.params.id, function(err, job) {
        if (!job)
            res.status(404).send("job not found");
        else
            job.drive = req.body.drive;
            job.profile = req.body.profile;
            job.domain = req.body.domain;
            job.role = req.body.role;
            job.location = req.body.location;
            job.description = req.body.description;
            job.targetBatchYear = req.body.targetBatchYear;
            job.targetCourses = req.body.targetCourses;
            job.visitDate = req.body.visitDate;
            job.compensationOffered = req.body.compensationOffered;
            job.eligibilityCriteria = req.body.eligibilityCriteria;
            job.selectionProcedure = req.body.selectionProcedure;
            job.otherInfoForStudents = req.body.otherInfoForStudents;
            job.lastDateToRegister = req.body.lastDateToRegister;
            job.dateOfJobPosting = req.body.dateOfJobPosting;

            job.save().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
    });
})


//@route    DELETE api/jobs/:id
//desc      delete Job
//access    Private+Admin
router.delete('/:id', adminAuth, (req, res) => {
    Job.findById(req.params.id)
        .then(job => job.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;