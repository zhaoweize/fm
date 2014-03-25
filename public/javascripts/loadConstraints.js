$.ajax({
  type:"POST",
  url: "/loadFeatureModel",
  success: function(data) {
  		data.features.forEach(function(feature, index) {
  			var node = new FMTreeItem(feature.text, feature.description, feature.optionality, feature.VP, feature._id);
  			var parent = FMTreeHandler.idPrefix + feature.parent_id;
        FMTreeHandler.all[parent].add(node);
  		});
  	},
  });
	document.write(tree);
}