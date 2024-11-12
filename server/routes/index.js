var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Landing Page' });
});
router.get('/list', (req, res) => {
  res.render('survey/list', { title: 'Landing Page' });
});
router.get('/add', (req, res) => {
  res.render('survey/add', { title: 'Landing Page' });
});
router.get('/edit', (req, res) => {
  res.render('survey/edit', { title: 'Landing Page' });
});


module.exports = router;
