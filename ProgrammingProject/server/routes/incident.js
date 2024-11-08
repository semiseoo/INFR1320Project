let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Incident = require('../model/incident');
const incident = require('../model/incident');
let incidentController = require('../controllers/incident.js')