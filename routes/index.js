var Feature = require('../models/feature.js');
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
  	id_no       : req.body.id_no       ,
		id          : req.body.id          ,
		text        : req.body.text        ,
		parent_id   : req.body.parent_id   ,
		description : req.body.description ,
		root        : req.body.root        ,
		optionality : req.body.optionality ,
		VP          : req.body.VP          ,
		level       : req.body.level       ,
  });
  console.log("    id_no :  " + newFeature.id_no      );
	console.log("    id:  " + newFeature.id         );
	console.log("    text:  " + newFeature.text       );
	console.log("    parent_id:  " + newFeature.parent_id  );
	console.log("    description:  " + newFeature.description);
	console.log("    root:  " + newFeature.root       );
	console.log("    optionality:  " + newFeature.optionality);
	console.log("    VP:  " + newFeature.VP         );
	console.log("    level:  " + newFeature.level      );
  Feature.get(newFeature.id, function(err, feature) {
  	console.log(newFeature.text+" 在index.js中的adNewFeature中的get开始了");
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
  		res.send({});
  	});
  	console.log("ADD NEW FEATURE: SUCCESS");
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
		console.log("FINISH SENDING")
	});
};

exports.removeFeature = function(req,res) {
	console.log("START \"removeFeature\"");
	var _id = req.body.id;
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
	var _id = req.body.id;
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
	var _id = req.body.id;
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
	var _id = req.body.id;
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
	var _id = req.body.id;
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
	var _id = req.body.id;
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
	var _id = req.body.id;
	var newVP = req.body.VP;
	Feature.updateVP(_id, newVP, function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log("UPDATE VP: SUCCESS");
	});
};