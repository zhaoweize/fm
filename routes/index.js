var Feature = require('../models/feature.js');
var Constraint = require('../models/constraint.js');
/*
 * GET home page.
 */
//
exports.index = function(req, res){
  console.log("start web");
  res.render('index', { title: 'Graph' });	//调用index.ejs展示页面，并传递参数title='Graph'给index.ejs
};

exports.addNewFeature = function(req,res){
  console.log("\n" + req.body.text + "在index.js中的 \"addNewFeature\"开始了！");
  var newFeature = new Feature({
		text        : req.body.text        ,
		parent_id   : req.body.parent_id   ,
		description : req.body.description ,
		root        : req.body.root        ,
		optionality : req.body.optionality ,
		VP          : req.body.VP          ,
		level       : parseInt(req.body.level),
  });
  Feature.getByTextAndRoot(newFeature.text, newFeature.root, function(err, feature) {
  	if (feature)
  	  err = 'Feature already exists.';
  	if (err) {
  		req.flash('error', err);
  		console.log("Feature already exists.");
  		return res.redirect('/');
  	}
  	newFeature.save(function(err) {
  		if (err)  {
  			req.flash('error', err);
  			return res.redirect('/');
  		}
  		console.log("FUCKing No ERR");
 			Feature.getByTextAndRoot(newFeature.text, newFeature.root, function(err, thefeature) {
 				if (!thefeature)
 					err = 'Feature has not be inserted.';
 				if (err) {
 					req.flash('error', err);
 					console.log("Feature has not be inserted.");
 					return res.redirect('/');
 				}
 				res.send({'_id': thefeature._id});
 				console.log("ADD NEW FEATURE: SUCCESS");
 			});
  	});
  });
};


exports.getFeatureById = function(req, res) {
	console.log("START \"getFeatureById\"");
	var _id = req.body._id;
	//console.log(_id + '\n');
	Feature.getById(_id, function(err, feature) {
		if (err) {
			console.log("GET FEATURE BY ID FAILED");
			req.flash('error', err);
			return res.redirect('/');
		}
		res.send({'feature':feature});
	});
};

exports.loadFeatureModel = function(req,res){
	console.log("START \"loadFeatureModel\"");
	Feature.getAll(function(err, features) {
		if (err) {
			console.log("LOAD FEATURE MODLE: FAIL");
			req.flash('error', err);
			return res.redirect('/');
		}
		res.send({'features': features});
		console.log("FINISH SENDING");
	});
};

exports.removeFeature = function(req,res) {
	console.log("START \"removeFeature\"");
	var _id = req.body._id;
	Feature.remove(_id, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		res.send({});
		console.log("DELETE FEATURE: SUCCESS");
	});
};

exports.removeSubtree = function(req,res) {
	console.log("START \"removeSubtree\"");
	var _id = req.body._id;
	Feature.removeSubtree(_id, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		res.send({});
		console.log("DELETE SUBTREE: SUCCESS");
	});
};

exports.updateText = function(req,res) {
	console.log("START \"updateText\"");
	var _id = req.body._id;
	var newText = req.body.text;
	Feature.updateText(_id, newText, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log("UPDATE NAME: SUCCESS");
	});
};

exports.updateDescription = function(req,res) {
	console.log("START \"updateDescription\"");
	var _id = req.body._id;
	var newDescription = req.body.description;
	Feature.updateDescription(_id, newDescription, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log("UPDATE DESCRIPTION: SUCCESS");
	});
};

exports.updateOptionality = function(req,res) {
	console.log("START \"updateOptionality\"");
	var _id = req.body._id;
	var newOptionality = req.body.optionality;
	Feature.updateOptionality(_id, newOptionality, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log("UPDATE OPTIONALITY: SUCCESS");
	});
};

exports.updateParent_id = function(req,res) {
	console.log("START \"updateParent_id\"");
	var _id = req.body._id;
	var newParent_id = req.body.parent_id;
	Feature.updateParent_id(_id, newParent_id, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log("UPDATE PARENT: SUCCESS");
	});
};

exports.updateVP = function(req,res) {
	console.log("START \"updateVP\"");
	var _id = req.body._id;
	var newVP = req.body.VP;
	Feature.updateVP(_id, newVP, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log("UPDATE VP: SUCCESS");
	});
};

exports.addNewConstraint = function(req,res) {
	console.log("index.js中的 \"addNewConstraint\"开始了！");
  var newConstraint = new Constraint({
		left       : req.body.left     ,
		relation   : req.body.relation ,
		right      : req.body.right    ,
  });
  Constraint.get(newConstraint, function(err, constraint) {
  	if (constraint)
  	  err = 'Constraint already exists.';
  	if (err) {
  		req.flash('error', err);
  		console.log("Constraint already exists.");
  		return res.redirect('/');
  	}
  	newConstraint.save(function(err) {
  		if (err)  {
  			req.flash('error', err);
  			return res.redirect('/');
  		}
 			Constraint.get(newConstraint, function(err, theconstraint) {
 				if (!theconstraint)
 					err = 'Constraint has not be inserted.';
 				if (err) {
 					req.flash('error', err);
 					console.log("Constraint has not be inserted.");
 					return res.redirect('/');
 				}
 				res.send({'_id': theconstraint._id});
 				console.log("ADD NEW CONSTRAINT: SUCCESS");
 			});
  	});
  });
};

exports.loadConstraints = function(req,res) {
	console.log("START \"loadConstraints\"");
	Constraint.getAll(function(err, constraints) {
		if (err) {
			console.log("LOAD CONSTRAINT: FAIL");
			req.flash('error', err);
			return res.redirect('/');
		}
		res.send({'constraints': constraints});
		console.log("FINISH SENDING");
	});
};

exports.removeConstraint = function(req,res) {
	console.log("START \"removeConstraint\"");
	var _id = req.body._id;
	Constraint.remove(_id, function(err){ 
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		res.send({});
		console.log("DELETE CONSTRAINT: SUCCESS");
	});
};