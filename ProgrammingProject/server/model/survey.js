const mongoose =  require("mongoose");

let incidentModel = mongoose.Schema({
    Name: String,
    Description: String,
    Active: Boolean,
    questions : [{type: String}],
},
{
    Collection:"incidents"
});
module.exports = mongoose.model('Incident',incidentModel);
