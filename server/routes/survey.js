let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Survey = require('../model/survey');
const survey = require('../model/survey');
let surveyController = require('../controllers/survey.js');


router.get('/',async(req,res,next)=>{
    try{
        const SurveyList = await Survey.find()
        res.render('survey/list',{
            title:'Surveys',
            SurveyList:SurveyList
        })}
        catch(err){
            console.error(err);
            res.render('survey/list',{
                error:'Error on the server'
            })
        }
});

router.get('/add',async(req,res,next)=>{
    try{
        res.render('survey/add',{
            title: 'Add Survey'
        })}
    catch(err){
        console.error(err);
        res.render('survey/list',{
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
            res.redirect('/list');
        })
    }
    catch(err){
        console.error(err);
        res.render('survey/list',{
            error:'Error on the server'
        })
    }
});
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const surveytoEdit = await Book.findbyId(id);
        res.render('survey/edit',
            {
            title: 'Edit Survey',
            Survey:surveytoEdit
        }
        )
    }
    catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updateSurvey = Survey({
            "_id":id,
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Active":req.body.Active
        });
        Survey.findByIdAndUpdate(id,updateSurvey).then(()=>{
            res.redirect("/list")
        })
    }
    catch(err){
        console.error(err);
        res.render('survey/list',{
            error: 'Error on the server'
        })
    }
});

router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        Survey.deleteOne({_id:id}).then(()=>{
            res.redirect('/list')
        })
    }
    catch(error){
        console.error(err);
        res.redner('server/list',{
            error:'Error on the server'
        })
    }
});

module.exports = router;