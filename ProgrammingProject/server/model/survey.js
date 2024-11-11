const mongoose =  require("mongoose");

let surveyModel = mongoose.Schema({
    Name: String,
    Description: String,
    Active: Boolean,
    questions : [{type: String}],
},
{
    Collection:"incidents"
});
module.exports = mongoose.model('Survey',surveyModel);
