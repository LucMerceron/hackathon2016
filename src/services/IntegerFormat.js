var IntegerFormat = {
	isInteger: function(value){
		var x;
  	return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
	}

}
module.exports = IntegerFormat;