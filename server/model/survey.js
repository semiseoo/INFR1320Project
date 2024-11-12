const mongoose =  require("mongoose");

let surveyModel = mongoose.Schema({
    Name: String,
    Description: String,
    Active: Boolean,
    questions : [{type: String}] ,
},
{
    Collection:"surveys"
});
module.exports = mongoose.model('Survey',surveyModel);
