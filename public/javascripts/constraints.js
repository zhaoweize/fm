var ConstraintConfig = {
	AexcludeIcon       : '/images/Aexclude.png',
	AexcludeAIcon      : '/images/AexcludeA.png'
	AexcludeVIcon      : '/images/AexcludeV.png'
	ArequireIcon       : '/images/Arequire.png'
	ArequireAIcon      : '/images/ArequireA.png'
	ArequireVIcon      : '/images/ArequireV.png'
	excludeIcon        : '/images/exclude.png' 
	excludeAIcon       : '/images/excludeA.png' 
	excludeVIcon       : '/images/excludeV.png' 
	requireIcon        : '/images/require.png' 
	requireAIcon       : '/images/requireA.png' 
	requireVIcon       : '/images/requireV.png' 
	VexcludeIcon       : '/images/Vexclude.png' 
	VexcludeAIcon      : '/images/VexcludeA.png'
 	VexcludeVIcon      : '/images/VexcludeV.png' 
	VrequireIcon       : '/images/Vrequire.png' 
	VrequireAIcon      : '/images/VrequireA.png' 
	VrequireVIcon      : '/images/VrequireV.png' 
}


var ConstraintHandler = {
	idPrefix  : "Constraint_",
	all : {},
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

function Constraint(sLeft, sRelation, sRight, sId) {
	this.id = ConstraintHandler.idPrefix + sId;
	this.left = sLeft;
	this.relation = sRelation;
	this.right = sRight;
	ConstraintHandler.all[this.id] = this;
}

Constraint.prototype.add = function (cons) {
	ConstraintHandler.insertHTMLBeforeEnd(document.getElementById("constraints_cont"), cons.toString());
	return cons;
}

Constraint.prototype.remove = function() {
	ConstraintHandler.all[this.id] = null;
	var tmp = document.getElementById(this.id);
	if (tmp) { 
		tmp.parentNode.removeChild(tmp);
	}
}

Constraint.prototype.toString = function () {
	var str = "<div id=\"" + this.id + "\" class=\"myConstraint\" onmouseover=\"" + this.id + "_button.className=''\" onmouseout=\"" + this.id + "_button.className='invisible'\">" +	
		"<table> <tr>" +
		"<td id=\"" + this.id + "_left\" class=\"myConstraintLeft\">" +
		"<table>";
	this.left.forEach(function(item, index) {

	});
	
	str += "</table></td>" + 
		"<td id=\"" + this.id + "_relation\" class=\"myConstraintMiddle\">" +
		"<img src=/images/" + this.relation + ".png /> </td>";
	
	str += "<td id=\"" + this.id + "_right\" class=\"myConstraintRight\">" +
		"<table>";
	this.right.forEach(function(item, index) {

	});	
  
  str += "</table></td></tr></table></div>"
}