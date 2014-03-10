var mongodb = require('./db');
function Feature(feature) {
  this.id          = feature.id          ;
  this.id_no       = feature.id_no       ;
  this.text        = feature.text        ;
  this.parent_id   = feature.parent_id   ;
  this.description = feature.description ;
  this.root        = feature.root        ;
  this.optionality = feature.optionality ;
  this.VP          = feature.VP          ;
  this.level       = feature.level       ;
};
module.exports = Feature;
//
Feature.prototype.save = function save(callback){
  // 存入 Mongodb 的文檔
  var feature = {
		id          : this.id          ,
		id_no       : this.id_no       ,
		text        : this.text        ,
		parent_id   : this.parent_id   ,
		description : this.description ,
		root        : this.root        ,
		optionality : this.optionality ,
		VP          : this.VP          ,
		level       : this.level       ,
  };
  /*mongodb.open(function(err,db) {
    if(err) {
      return callback(err);
    }
    db.collection('fmtree', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('id', {unique: true});
      collection.insert(feature, {safe:true}, function(err, feature) {
        mongodb.close();
        callback(err, feature);
      });
    });
  });*/
  mongodb.collection('fmtree', function(err, collection) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    collection.ensureIndex('id', {unique: true});
    collection.insert(feature, {safe:true}, function(err, feature) {
      //mongodb.close();
      callback(err, feature);
    });
  });
};

Feature.get = function get(feature_id, callback) {
	/*mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('fmtree', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (feature_id) {
				query.id = feature_id;
			}
			collection.findOne({id: feature_id}, function(err, doc) {
				mongodb.close();
				if (doc) {
					var feature = new Feature(doc);
					callback(err, feature);
				} else {
					callback(err, null);
				}
			});
		});
	});*/
  mongodb.collection('fmtree', function(err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		var query = {};
		if (feature_id) {
			query.id = feature_id;
		}
		collection.findOne({id: feature_id}, function(err, doc) {
			//mongodb.close();
			if (doc) {
				var feature = new Feature(doc);
				callback(err, feature);
			} else {
				callback(err, null);
			}
		});
	});
};

Feature.getAll = function getAll(callback) {
	/*mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('fmtree', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			collection.find(query).sort({level: 1, text:1}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					callback(err, null);
				}

				var features = [];
				docs.forEach(function(doc, index) {
					var feature = new Feature(doc);
					features.push(feature);
				});
				callback(null, features);
			});
		});
	});*/
  mongodb.collection('fmtree', function (err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		var query = {};
		collection.find(query).sort({level: 1, text:1}).toArray(function(err, docs) {
			//mongodb.close();
			if (err) {
				callback(err, null);
			}

			var features = [];
			docs.forEach(function(doc, index) {
				var feature = new Feature(doc);
				features.push(feature);
			});
			callback(null, features);
		});
	});
};

Feature.remove = function remove(feature_id, callback) {
	mongodb.collection('fmtree', function (err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		var query = {};
		query.id = feature_id;
		collection.remove(query, function (err) {
			//mongodb.close();
			callback(err);
		});
	});
};

Feature.removeSubtree = function removeSubtree(feature_id, callback) {
	mongodb.collection('fmtree', function (err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		Feature._removeSubtree(collection, feature_id);
		callback(err);
	});
};

Feature._removeSubtree = function _removeSubtree (collection, feature_id) {
	//找出所有feature_id的子结点并对其递归调用_removeSubtree
	collection.find({parent_id: feature_id}).sort({level: 1, text:1}).toArray(function(err, docs) {
		if (err) {
			//callback(err, null);
		}
		docs.forEach(function(doc, index) {
			Feature._removeSubtree(collection, doc.id);
		});
		//callback(null, features);
	});
	var query = {};
	query.id = feature_id;
	collection.remove(query, function (err) {
		//mongodb.close();
		//callback(err);
	});
}

Feature.updateText = function updateText(feature_id, newText, callback) {
		mongodb.collection('fmtree', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			query.id = feature_id;
			var newFeature = {};
			newFeature.text = newText;
			collection.update(query, {$set: newFeature}, function (err) {
				//mongodb.close();
				callback(err);
			});
		});
};

Feature.updateDescription = function updateDescription(feature_id, newDescription, callback) {
		mongodb.collection('fmtree', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			query.id = feature_id;
			var newFeature = {};
			newFeature.description = newDescription;
			collection.update(query, {$set: newFeature}, function (err) {
				//mongodb.close();
				callback(err);
			});
		});
};

Feature.updateOptionality = function updateOptionality(feature_id, newOptionality, callback) {
	mongodb.collection('fmtree', function (err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}
		var query = {};
		query.id = feature_id;
		var newFeature = {};
		newFeature.optionality = newOptionality;
		collection.update(query, {$set: newFeature}, function (err) {
			//mongodb.close();
			callback(err);
		});
	});
};

Feature.updateParent_id = function updateParent_id(feature_id, newParent_id, callback) {
		mongodb.collection('fmtree', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			console.log("CURRENT　FEATURE IS: "+feature_id);
			console.log("NEW PARENT IS: "+newParent_id);
			var query = {};
			query.id = feature_id;
			var newFeature = {};
			newFeature.parent_id = newParent_id;
			collection.update(query, {$set: newFeature}, function (err) {
				//mongodb.close();
				callback(err);
			});
		});
};

Feature.updateVP = function updateVP(feature_id, newVP, callback) {
	mongodb.collection('fmtree', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			query.id = feature_id;
			var newFeature = {};
			newFeature.VP = newVP;
			collection.update(query, {$set: newFeature}, function (err) {
				//mongodb.close();
				callback(err);
			});
		});
};

