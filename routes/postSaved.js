var SavedArticle = require('../models/savedArticleModel');

module.exports = function(req, res) {

    var savedArticle = new SavedArticle({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });
 
  savedArticle.save(function(err) {
    if (err) {
      
      res.json({status: 'error'})
    } else {
      
      res.json({status: 'saved'})
    }
  });
  
}