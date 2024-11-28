var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Survey = require('../model/survey');
//let surveyController = require('../controllers/survey.js')

function isAuthenticated(req, res,next) {
    if (req.isAuthenticated()) {
      return next(); 
    }
    req.flash('loginMessage', 'Log in/Register to access');
    res.redirect('/login');
  }

router.get('/',async(req,res,next)=>{
try{
    const SurveyList = await Survey.find();
    res.render('Survey/list',{
        title:'Surveys',
        SurveyList:SurveyList,
        displayName: req.user ? req.user.displayName: ''
    });}
    catch(err){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server',
            displayName: req.user ? req.user.displayName: ''
        })
    }
    });

    
router.get('/add', isAuthenticated, async (req, res, next) => {
  try {
    res.render('Survey/add', {
      title: 'Add Survey',
      displayName: req.user ? req.user.displayName: ''
    });
  } catch (err) {
    console.error(err);
    res.render('Survey/list', {
      error: 'Error on the server',
      displayName: req.user ? req.user.displayName: ''
    });
  }
});

router.post('/add', isAuthenticated, async(req,res,next)=>{
    try{
        let newSurvey = Survey({
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Active":req.body.Active
        });
        Survey.create(newSurvey).then(()=>{
            res.redirect('/surveyslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server',
            displayName: req.user ? req.user.displayName: ''
        })
    }
});

router.get('/edit/:id', isAuthenticated, async(req,res,next)=>{
    try{
        const id = req.params.id;
        const surveyToEdit= await Survey.findById(id);
        res.render('Survey/edit',
            {
                title:'Edit Survey',
                Survey:surveyToEdit,
                displayName: req.user ? req.user.displayName: ''
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id', isAuthenticated, async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedSurvey = Survey({
            "_id":id,
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Active":req.body.Active
        });
        Survey.findByIdAndUpdate(id,updatedSurvey).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server',
            displayName: req.user ? req.user.displayName: ''
        })
    }
});
router.get('/delete/:id', isAuthenticated, async(req,res,next)=>{
    try{
        let id=req.params.id;
        Survey.deleteOne({_id:id}).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server',
            displayName: req.user ? req.user.displayName: ''
        })
    }
});
module.exports = router;