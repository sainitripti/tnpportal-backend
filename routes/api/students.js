const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const jwtSecret = config.get('jwtSecret');

//Student model
const Student = require('../../models/Student');

//@route    GET api/students
//desc      GET All Students
//access    Private
router.get('/', auth, (req, res) => {
    Student.find()
        .then(student => res.json(student))
});

//@route    POST api/students
//desc      create a new Student
//access    Private+Admin
router.post('/', adminAuth, (req, res) => {
    const {enrollmentNum, name, emailID, phoneNumber, branch, course, graduationYear, 
        currentPercentage, percentage10, percentage12, percentageUG, backlogs,
        resumeLink, isAppearingForPlacements, isPlaced, offerDetails} = req.body;
    const activeBacklogs = req.body.backlogs.activeBacklogs;
    const deadBacklogs = req.body.backlogs.deadBacklogs;

    //Simple validation
    if(!enrollmentNum){
        return res.status(400).json({msg: "Please enter enrollment number!"});
    }
    if(!name){
        return res.status(400).json({msg: "Please enter student name!"});
    }
    if(!emailID){
        return res.status(400).json({msg: "Please enter emailID!"});
    }
    if(!phoneNumber){
        return res.status(400).json({msg: "Please enter phone number!"});
    }
    if(!branch){
        return res.status(400).json({msg: "Please enter branch!"});
    }
    if(!course){
        return res.status(400).json({msg: "Please enter course!"});
    }
    if(!graduationYear){
        return res.status(400).json({msg: "Please enter graduation year!"});
    }
    if(!currentPercentage){
        return res.status(400).json({msg: "Please enter current percentage!"});
    }
    if(!percentage10){
        return res.status(400).json({msg: "Please enter percentage of class 10th!"});
    }
    if(!percentage12){
        return res.status(400).json({msg: "Please enter percentage of class 12th!"});
    }
    if(!percentageUG){
        return res.status(400).json({msg: "Please enter percentage of UG degree!"});
    }
    if(!backlogs){
        return res.status(400).json({msg: "Please enter backlogs!"});
    }
    if(!activeBacklogs){
        return res.status(400).json({msg: "Please enter active backlogs!"});
    }
    if(!deadBacklogs){
        return res.status(400).json({msg: "Please enter dead backlogs!"});
    }
    if(!resumeLink){
        return res.status(400).json({msg: "Please enter resume link!"});
    }
    if(!isAppearingForPlacements){
        return res.status(400).json({msg: "Please enter if student is appearing for placement or not!"});
    }
    if(!isPlaced){
        return res.status(400).json({msg: "Please enter if student is placed or not!"});
    }
    if(!offerDetails){
        return res.status(400).json({msg: "Please enter offer details!"});
    }

    //Check for existing student
    Student.findOne({enrollmentNum})
        .then(student => {
            if(student) return res.status(400).json({msg: "Student already exist!"});

            const newStudent = new Student({
                enrollmentNum, 
                name, 
                emailID, 
                phoneNumber, 
                branch, 
                course, 
                graduationYear, 
                currentPercentage, 
                percentage10, 
                percentage12, 
                percentageUG, 
                backlogs, 
                activeBacklogs, 
                deadBacklogs,
                resumeLink, 
                isAppearingForPlacements, 
                isPlaced, 
                offerDetails
            });

                    
            newStudent.save()
            .then(student => {

                res.json({
                    student: {
                        id: student.id,
                        enrollmentNum: student.enrollmentNum
                    },
                    msg: {
                        success: true
                    }                      
                })
            })                     
        })
});

//@route    PUT api/student/:id
//desc      update Student
//access    Private+Admin
router.put('/:id', adminAuth, (req, res) => {
    Student.findById(req.params.id, function(err, student) {
        if (!student)
            res.status(404).send("student not found");
        else
            student.enrollmentNum = req.body.enrollmentNum;
            student.name = req.body.name;
            student.emailID = req.body.emailID;
            student.phoneNumber = req.body.phoneNumber;
            student.branch = req.body.branch;
            student.course = req.body.course;
            student.graduationYear = req.body.graduationYear;
            student.currentPercentage = req.body.currentPercentage;
            student.percentage10 = req.body.percentage10;
            student.percentage12 = req.body.percentage12; 
            student.percentageUG = req.body.percentageUG; 
            student.backlogs = req.body.backlogs;
            student.activeBacklogs = req.body.backlogs.activeBacklogs;
            student.deadBacklogs = req.body.backlogs.deadBacklogs;
            student.resumeLink = req.body.resumeLink;
            student.isAppearingForPlacements = req.body.isAppearingForPlacements;
            student.isPlaced = req.body.isPlaced;
            student.offerDetails = req.body.offerDetails;
                
            student.save().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
    });
})

//@route    DELETE api/students/:id
//desc      delete Student
//access    Private+Admin
router.delete('/:id', adminAuth, (req, res) => {
    Student.findById(req.params.id)
        .then(student => student.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;