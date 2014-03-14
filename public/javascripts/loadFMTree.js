if (document.getElementById) {
	var tree = new FMTree('老父亲', 'It is the root feature.');

  $.ajax({
  	type:"POST",
   	url: "/loadFeatureModel",
   	success: function(data) {
  		data.features.forEach(function(feature, index) {
  			var node = new FMTreeItem(feature.text, feature.description, feature.optionality, feature.VP, feature.id_no, feature.id);
  			FMTreeHandler.all[feature.parent_id].add(node);
  		});
  	},
  });
	document.write(tree);
}
