const express = require('express');
const Material = require('../../models/Materials');
const passport = require('passport');
const router = express.Router();
const validateMaterialInput = require('../../validation/addMaterial')

//@route api/materials/test
//@desc test user route
//@access Public
router.get('/test',(req,res) =>{
    res.json({msg: "Materials Works"})
});
router.get('/getMaterial', passport.authenticate('jwt',{session: false}), (req,res)=>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    Material.find({}).then((err,materials) =>{
        console.log(materials)
        res.status(200).json({materials})
    })
});
router.post('/addMaterial', passport.authenticate('jwt',{session: false}), (req,res)  =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    let {errors, isValid} = validateMaterialInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newMaterial = new Material({
        name: req.body.name,
        type: req.body.type,
        link: req.body.link
    })
    newMaterial
            .save()
            .then(material => res.json(material))
            .catch(err => console.log(err));
});

module.exports = router;