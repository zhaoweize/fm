var mongodb = require('./db');
function Feature(feature) {
  this.id_no       = feature.id_no       ;
  this.id          = feature.id          ;
  this.text        = feature.text        ;
  this.parent      = feature.parent      ;
  this.description = feature.description ;
  this.root        = feature.root        ;
  this.optionality = feature.optionality ;
  this.VP          = feature.VP          ;
};
module.exports = Feature;

Feature.prototype.save = function save(callback){
  // 存入 Mongodb 的文檔
  var feature = {
    id_no       : this.id_no       ,
		id          : this.id          ,
		text        : this.text        ,
		parent      : this.parent      ,
		description : this.description ,
		root        : this.root        ,
		optionality : this.optionality ,
		VP          : this.VP          ,
  };
  mongodb.open(function(err,db) {
    if(err) {
      return callback(err);
    }
    db.collection('fmtree', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('id_no', {unique: true});
      collection.insert(feature, {safe:true}, function(err, feature) {
        mongodb.close();
        callback(err, feature);
      });
    });
  });
};

Feature.get = function get(feature_id_no, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('fmtree', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({id_no: feature_id_no}, function(err, doc) {
				mongodb.close();
				if (doc) {
					var feature = new Feature(doc);
					callback(err, feature);
				} else {
					callback(err, null);
				}
			});
		});
	});
};