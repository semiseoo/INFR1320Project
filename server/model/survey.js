const mongoose = require("mongoose");

let surveyModel = mongoose.Schema({
    Name: String,
    Description: String,
    Active: String
},
{
    collection:"Surveys"
});
module.exports =mongoose.model('Survey',surveyModel);
