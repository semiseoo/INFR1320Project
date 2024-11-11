let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../model/survey');
const survey = require('../model/survey');
let surveyController = require('../controllers/survey.js')

router.post('/survey', surveyController.createSurvey);
router.get('/surveys', surveyController.getSurveys);
router.put('/survey/:id', surveyController.updateSurvey);
router.delete('/survey/:id', surveyController.deleteSurvey);

module.exports = router;