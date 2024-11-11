const mongoose =  require("mongoose");

let incidentModel = mongoose.Schema({
    Name: String,
    Description: String,
    Severity: Number,
    Location: String
},
{
    Collection:"incidents"
});
module.exports = mongoose.model('Incident',incidentModel);
