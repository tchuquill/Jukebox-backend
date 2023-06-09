var express = require('express');
var router = express.Router();
require('../models/connection');
const Party = require('../models/parties');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//enregister la soirée dans la BDD
router.post('/newparty', function(req, res, next) {
  //si party n'existe pas, on la créée
  Party.findOne({ name: req.body.name }).then(data => {
    if (data === null) {

      const newParty = new Party({
      name: req.body.name
      });

      newParty.save().then(newDoc => {
        res.json({ result: true, name: newDoc.name });
      });
    } else {
      // si la party existe déja
      res.json({ result: false, error: 'Party already exists' });
    }
  });
});

//vérifier si la party existe bien lorsque l'invité la rentre
router.get('/findparty', (req, res) => {
  Party.findOne({name:req.query.name})
  .then(data => {
    if (data === null) {
    res.json({result: false, error: 'Party not found'})
    } else {
      res.json({result: true, message: 'welcome to the party!'});
    }
  })})
  


module.exports = router;
