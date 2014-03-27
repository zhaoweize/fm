var ConstraintConfig = {
	AexcludeIcon       : '/images/Aexclude.png',
	AexcludeAIcon      : '/images/AexcludeA.png',
	AexcludeVIcon      : '/images/AexcludeV.png',
	ArequireIcon       : '/images/Arequire.png',
	ArequireAIcon      : '/images/ArequireA.png',
	ArequireVIcon      : '/images/ArequireV.png',
	excludeIcon        : '/images/exclude.png' ,
	excludeAIcon       : '/images/excludeA.png' ,
	excludeVIcon       : '/images/excludeV.png' ,
	requireIcon        : '/images/require.png' ,
	requireAIcon       : '/images/requireA.png' ,
	requireVIcon       : '/images/requireV.png' ,
	VexcludeIcon       : '/images/Vexclude.png' ,
	VexcludeAIcon      : '/images/VexcludeA.png',
 	VexcludeVIcon      : '/images/VexcludeV.png' ,
	VrequireIcon       : '/images/Vrequire.png' ,
	VrequireAIcon      : '/images/VrequireA.png' ,
	VrequireVIcon      : '/images/VrequireV.png' ,
}


var ConstraintHandler = {
	idPrefix  : "Constraint_",
	all : {},
	remove    : function (oItem) { this.all[oItem.id.replace('-rem','')].remove(); },
	insertHTMLBeforeEnd  :  function (oElement, sHTML) {
    /* 如果可以用 insertAdjacentHTML 方法 */
    if (oElement.insertAdjacentHTML != null) {
      oElement.insertAdjacentHTML("BeforeEnd", sHTML)
      return;
    }
    /* 如果不可以用 insertAdjacentHTML 方法 */
    var df;  // DocumentFragment
    var r = oElement.ownerDocument.createRange();
    r.selectNodeContents(oElement);
    r.collapse();
    df = r.createContextualFragment(sHTML);
    oElement.appendChild(df);
  }
}

function Constraint_item(sId, sIsNot, sFeature_id) {
	this.id = sId;
	this.isNot = sIsNot;
	this.feature_id = sFeature_id;
}

function Constraint(sLeft, sRelation, sRight, sId) {
	this.id = ConstraintHandler.idPrefix + sId;
	this.left = sLeft;
	this.relation = sRelation;
	this.right = sRight;
	ConstraintHandler.all[this.id] = this;
}

Constraint.prototype.add = function () {
	ConstraintHandler.insertHTMLBeforeEnd(document.getElementById("constraints_cont"), this.toString());
}

Constraint.prototype.remove = function() {
	if (window.confirm("Do you want to delete this constraint?")) {
		ConstraintHandler.all[this.id] = null;
		var tmp = document.getElementById(this.id);
		if (tmp) { 
			tmp.parentNode.removeChild(tmp);
		}
	}
}

Constraint.prototype.toString = function () {
	var str = "<div id=\"" + this.id + "\" class=\"myConstraint\" onmouseover=\"" + this.id + "_button.className=''\" onmouseout=\"" + this.id + "_button.className='invisible'\">" +	
		"<table> <tr>" +
		"<td id=\"" + this.id + "_left\" class=\"myConstraintLeft\">" +
		"<table>";
	var tempid = this.id;
	this.left.forEach(function(item, index) {
		str += "<tr id=\"" + tempid + "_left_" + item.id + "\">" +
			"<td id=\"" + tempid + "_left_" + item.id + "_text\">";
		if (item.isNot)
			str += "~ ";
		str += item.feature_id + 
			"</td></tr>";
	});
	
	str += "</table></td>" + 
		"<td id=\"" + tempid + "_relation\" class=\"myConstraintMiddle\">" +
		"<img src=/images/" + this.relation + ".png /> </td>";
	
	str += "<td id=\"" + tempid + "_right\" class=\"myConstraintRight\">" +
		"<table>";
	this.right.forEach(function(item, index) {
		str += "<tr id=\"" + tempid + "_right_" + item.id + "\">" +
			"<td id=\"" + tempid + "_right_" + item.id + "_text\">";
		if (item.isNot)
			str += "~ ";
		str += item.feature_id + 
			"</td></tr>";
	});	
  
  str += "</table></td>" +
  	"<td class=\"myConstraintButton\"><span class=\"invisible\" id=\"" + this.id + "_button\">" +
  	"<i class=\"icon-remove\" id=\"" + this.id + "-rem\" onclick=\"ConstraintHandler.remove(this);\"></i> " +
  	"</span>" + "</td></tr></table></div>";
  return str;
}