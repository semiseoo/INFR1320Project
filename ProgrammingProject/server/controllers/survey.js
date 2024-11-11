const Survey = require('../model/survey');

exports.createSurvey = (req, res) => {
    let survey = new Survey(req.body);
    survey.save((err, savedSurvey) => {
        if (err) return res.status(400).send(err);
        res.send(savedSurvey);
    });
};


exports.getSurveys = (req, res) => {
    Survey.find({active: true}, (err, surveys) => {
        if (err) return res.status(500).send(err);
        res.send(surveys);
    });
};

exports.updateSurvey = (req, res) => {
    Survey.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, updatedSurvey) => {
        if (err) return res.status(400).send(err);
        res.send(updatedSurvey);
    });
};

exports.deleteSurvey = (req, res) => {
    Survey.findByIdAndDelete(req.params.id, (err, deletedSurvey) => {
      if (err) return res.status(500).send(err);
      res.send(deletedSurvey);
    });
  };