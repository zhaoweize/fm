if (document.getElementById) {
  var l1 = new Array();
  l1[0] = new Constraint_item('aaa', false, 'AAA');
  l1[1] = new Constraint_item('bbb', true, 'BBB');
  l1[2] = new Constraint_item('ccc', true, 'CCC');
  var r1 = new Array();
  r1[0] = new Constraint_item('ddd', true, 'DDD');
  r1[1] = new Constraint_item('eee', false, 'EEE');
  var rela1 = "AexcludeA";
  var c1 = new Constraint(l1, rela1, r1, "hehehe1");
  c1.add();

  var l2 = new Array();
  l2[0] = new Constraint_item('ss', false, 'as');
  l2[1] = new Constraint_item('ee', true, 'dada');
  l2[2] = new Constraint_item('dd', true, 'asd');
  var r2 = new Array();
  r2[0] = new Constraint_item('qq', true, '23123');
  r2[1] = new Constraint_item('11', false, 'dadsd');
  var rela2 = "VexcludeA";
  var c2 = new Constraint(l2, rela2, r2, "hehehe2");
  c2.add();
}





/*$.ajax({
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
}*/
