var Feature = require('../models/feature.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("start web");
  res.render('index', { title: 'Graph' });	//调用index.ejs展示页面，并传递参数title='Graph'给index.ejs
};

exports.addNewFeature = function(req,res){
  console.log("start the function");
  var newFeature = new Feature({
  	id_no       : req.body.id_no       ,
	  id          : req.body.id          ,
	  text        : req.body.text        ,
		parent      : req.body.parent      ,
		description : req.body.description ,
		root        : req.body.root        ,
		optionality : req.body.optionality ,
		VP          : req.body.VP          ,
  });
  
  Feature.get(newFeature.id_no, function(err, feature) {
  	console.log("start getting");
  	if (feature)
  	  err = 'FeatureID already exists.';
  	if (err) {
  		req.flash('error', err);
  		console.log("FeatureID already exists.");
  		return res.redirect('/');
  	}
  	newFeature.save(function(err) {
  		if (err)  {
  			req.flash('error', err);
  			return res.redirect('/');
  		}
  	});
  	console.log("add new feature success");
  });
};
