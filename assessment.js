const express = require('express');
const Assessment = require('../../models/Assessments');
const router = express.Router();
const passport= require('passport');

//@route api/assessmemt/test
//@desc test user route
//@access Public
router.get('/test',(req,res) =>{
    res.json({msg: "Assessment Works"})
});
router.post('/addAssessment', passport.authenticate('jwt',{session: false}), (req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"});
    console.log(req.body);
    Assessment.findOne({id: req.body.id})
    .then(assessmemt =>{
        if(assessmemt){
            return res.status(401).json({assessment: "Assessment already exists"})
        }
        const newAssessment = new Assessment(req.body)
        newAssessment
                .save()
                .then(assessment => res.json(assessment))
                .catch(err => console.log(err));
    })
})
router.post('/addQuestions', passport.authenticate('jwt',{session: false}), (req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"});
    console.log(req.body);
    Assessment.findOne({id: req.body.id})
    .then(assessmemt =>{
        if(!assessmemt){
            return res.status(401).json({assessment: "Assessment not found"})
        }
        Assessment.updateOne({_id: assessmemt._id, $push: {questions: req.body.questions}}).then((err,result) =>{
            if(err) return res.status(400).json(err)
            else return res.status(200).json(result)
        })
    })
})
module.exports = router;