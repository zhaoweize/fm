var AddNewConstraintHandler = {
  leftIdPrefix   : "item_left_",
  rightIdPrefix  : "item_right_",
  leftIdCounter  : 0,
  rightIdCounter : 0,
  leftAll        : {},
  rightAll       : {},
  getLeftId      : function() { return this.leftIdCounter++; },
  getRightId     : function() { return this.rightIdCounter++;},
  addLeftItem    : function() {
    var str = '';
    var temp_id = "addNewConstraint_left_" + this.getLeftId();
    this.leftAll[temp_id] = temp_id;
    str += "<select id=\"" + temp_id + "\" class=\"addNewConstraintSelect\">";
    str += this.getAllFeatureTextToSelection();
    str += "</select>";
    this.insertHTMLBeforeEnd(document.getElementById("addNewConstraint_left"),str); 
  },
  addRightItem    : function() {
    var str = '';
    var temp_id = "addNewConstraint_right_" + this.getRightId();
    this.rightAll[temp_id] = temp_id;
    str += "<select id=\"addNewConstraint_right_" + this.getRightId() + "\" class=\"addNewConstraintSelect\">";
    str += this.getAllFeatureTextToSelection();
    str += "</select>";
    this.insertHTMLBeforeEnd(document.getElementById("addNewConstraint_right"),str); 
  },
  getAllFeatureTextToSelection: function() {
    var temp = '';
    for (feature_id in FMTreeHandler.all) {
      if(FMTreeHandler.all[feature_id]){
        temp += "<option value=\"" + feature_id + "\">" + FMTreeHandler.all[feature_id].text + "</option>";
      }
    }
    return temp;
  },
  insertHTMLBeforeEnd : function(oElement, sHTML) {
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
  },
}