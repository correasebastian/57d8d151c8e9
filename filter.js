// byType
Array.prototype.filter = function(predicateFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
	  if (predicateFunction(itemInArray)) {
		results.push(itemInArray);
	  }
	});

	return results;
};

var t="assessment_needs_review"
a.filter(function(obj) {
			return obj.type === t;
		})