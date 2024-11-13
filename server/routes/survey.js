var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Survey = require('../model/survey');
const survey = require('../model/survey');
//let surveyController = require('../controllers/survey.js')

router.get('/',async(req,res,next)=>{
try{
    const SurveyList = await Survey.find();
    res.render('/surveyslist',{
        title:'Surveys',
        SurveyList:SurveyList
    })}
    catch(err){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
    });

router.get('/add',async(req,res,next)=>{
    try{
        res.render('Survey/add',{
            title: 'Add Survey'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
});

router.post('/add',async(req,res,next)=>{
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
            error:'Error on the server'
        })
    }
});

router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const surveyToEdit= await Survey.findById(id);
        res.render('Survey/edit',
            {
                title:'Edit Survey',
                Survey:surveyToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id',async(req,res,next)=>{
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
            error:'Error on the server'
        })
    }
});
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Survey.deleteOne({_id:id}).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;