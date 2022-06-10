const express = require('express');
const mongoose = require('mongoose');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const router = express.Router();
const User = require('../../models/Users');
const Courses = require('../../models/Courses');
const Materials = require('../../models/Materials');
const EnrolledCourses = require('../../models/EnrolledCourses');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../keys');
const passport = require('passport');
//@route api/users/test
//@desc test user route
//@access Public
router.get('/test',(req,res) =>{
    res.json({msg: "User Works"});
});
router.post('/register',(req,res) => {
    console.log(req.body);
    let { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
    return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    })
    .then(user =>{
        if (user){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);

        }
        else{
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                name: req.body.name,
                password: req.body.password,
                age: req.body.age,
                gender: req.body.gender,
                role: false,

            })
            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(req.body.password,salt,(err,hash) =>{
                    if(err){
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    }) 
});
// @route GET api/users/login
// @desc Login User / return JWT Token
// @access Public
router.post('/login',(req,res) =>{

    const username = req.body.username;
    const password = req.body.password;
    let { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
    return res.status(400).json(errors);
    }
    User.findOne({username})
        .then(user =>{
            if(!user){
                errors.username = 'User not found';
                return res.status(404).json(errors);
            }
            //Check password
            else{
                bcrypt.compare(password,user.password)
                .then(isMatch =>{
                    if(isMatch){
                        //User Matched
                        //return res.status(200).json({msg: "Success"})
                        
                        //Create Payload
                        const payload = {id: user.id, username: user.username, email: user.email}; //JWT Payload

                        //Sign Token
                        jwt.sign(payload,keys.tokenKey, {expiresIn: 3600},
                            (err,token) =>{
                                return res.status(200).json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    }
                    else{
                        errors.correct = user.password;
                        errors.password = "Password incorrect";
                        return res.status(400).json(errors);
                    }
                });
            }
        });
});
router.get('/learner/index',passport.authenticate('jwt',{session: false}),(req,res) =>{
    return res.json({
        id:req.user.id,
        username: req.user.username,
        email:req.user.email
    });
});
router.get('/admin/index',passport.authenticate('jwt',{session: false}),(req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    return res.json({
        id:req.user.id,
        username: req.user.username,
        email:req.user.email
    });
});
router.get('/admin/dashboard',passport.authenticate('jwt',{session: false}),(req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    User.count({},(err,totalLearners) =>{
        totalLearners -= 1
        Courses.count({},(err,totalCourses)=>{
            EnrolledCourses.count({},(err,enrolledCoursesCount)=>{
                EnrolledCourses.count({isCompleted: true},(err,certificateCount) =>{
                    Materials.count({},(err,materialCount)=>{
                        Courses.find({},(err,allCourses)=>{
                            res.status(200).json({totalLearners,totalCourses,enrolledCoursesCount,
                                materialCount,certificateCount,allCourses})
                        })
                    })
                })
            })
        })
        
    })
    

})
module.exports = router;