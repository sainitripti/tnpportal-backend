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
    const {drive, profile, domain, role, location, description, 
        stipend, compensationOffered, totalCTC, breakupCTC, fixed, variable, bonds, otherAllowances,
        eligibilityCriteria, targetBatchYear, targetCourses, cutoffPercentage, activeBacklogs, deadBacklogs,
        selectionProcedure, visitDate, hasWrittenTest, hasOnlineTest, hasGD, hasTechnicalRound, hasHRRound,
        otherInfoForStudents, lastDateToRegister, dateOfJobPosting} = req.body;
    
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
    if(!stipend) {
        return res.status(400).json({msg: "Please enter stipend for interns!"});
    }
    if(!compensationOffered) {
        return res.status(400).json({msg: "Please enter compensation!"});
    }
    if(!totalCTC) {
        return res.status(400).json({msg: "Please enter total CTC!"});
    }
    if(!breakupCTC) {
        return res.status(400).json({msg: "Please enter breakupCTC!"});
    }
    if(!fixed){
        return res.status(400).json({msg: "Please enter fixed pay!"});
    }   
    if(!variable) {
        return res.status(400).json({msg: "Please enter variable pay!"});
    }
    if(!bonds) {
        return res.status(400).json({msg: "Please enter bonds!"});
    }
    if(!otherAllowances) {
        return res.status(400).json({msg: "Please enter otherAllowances!"});
    }
    if(!eligibilityCriteria) {
        return res.status(400).json({msg: "Please enter eligibility criteria!"});
    }
    if(!targetBatchYear) {
        return res.status(400).json({msg: "Please enter target batch year!"});
    }
    if(!targetCourses) {
        return res.status(400).json({msg: "Please enter target courses!"});
    }
    if(!cutoffPercentage) {
        return res.status(400).json({msg: "Please enter cutoff percentage!"});
    }
    if(!activeBacklogs) {
        return res.status(400).json({msg: "Please enter active backlogs!"});
    }
    if(!deadBacklogs) {
        return res.status(400).json({msg: "Please enter dead backlogs!"});
    }
    if(!selectionProcedure){
        return res.status(400).json({msg: "Please enter selection procedure!"});
    }   
    if(!visitDate) {
        return res.status(400).json({msg: "Please enter visit date!"});
    }
    if(!hasWrittenTest) {
        return res.status(400).json({msg: "Please enter if there is any Written Test or not!"});
    }
    if(!hasOnlineTest) {
        return res.status(400).json({msg: "Please enter if there is any Online Test or not!"});
    }
    if(!hasGD) {
        return res.status(400).json({msg: "Please enter if there is any GD round or not!"});
    }
    if(!hasTechnicalRound) {
        return res.status(400).json({msg: "Please enter if there is any technical round or not!"});
    }
    if(!hasHRRound) {
        return res.status(400).json({msg: "Please enter if there is any HR round or not!"});
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
    Result.findOne({drive})
        .then(job => {
            if(job) return res.status(400).json({msg: "Job drive already exist!"});

            const newJob = new Job({
                drive, 
                profile, 
                domain, 
                role, 
                location, 
                description, 
                stipend, 
                compensationOffered, 
                totalCTC, 
                breakupCTC, 
                fixed, 
                variable, 
                bonds, 
                otherAllowances,
                eligibilityCriteria, 
                targetBatchYear, 
                targetCourses, 
                cutoffPercentage, 
                activeBacklogs, 
                deadBacklogs,
                selectionProcedure, 
                visitDate, 
                hasWrittenTest, 
                hasOnlineTest, 
                hasGD, 
                hasTechnicalRound, 
                hasHRRound,
                otherInfoForStudents, 
                lastDateToRegister, 
                dateOfJobPosting
            });

                    
            newJob.save()
            .then(job => {

                res.json({
                    job: {
                        id: job.id,
                        drive: result.drive
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
            job.stipend = req.body.stipend;
            job.compensationOffered = req.body.compensationOffered;
            job.totalCTC = req.body.totalCTC;
            job.breakupCTC = req.body.breakupCTC;
            job.fixed = req.body.fixed;
            job.variable = req.body.variable;
            job.bonds = req.body.bonds;
            job.otherAllowances = req.body.otherAllowances;
            job.eligibilityCriteria = req.body.eligibilityCriteria;
            job.targetBatchYear = req.body.targetBatchYear;
            job.targetCourses = req.body.targetCourses;
            job.cutoffPercentage = req.body.cutoffPercentage;
            job.activeBacklogs = req.body.activeBacklogs;
            job.deadBacklogs = req.body.deadBacklogs;
            job.selectionProcedure = req.body.selectionProcedure;
            job.visitDate = req.body.visitDate;
            job.hasWrittenTest = req.body.hasWrittenTest;
            job.hasOnlineTest = req.body.hasOnlineTest;
            job.hasGD = req.body.hasGD;
            job.hasTechnicalRound = req.body.hasTechnicalRound;
            job.hasHRRound = req.body.hasHRRound;
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