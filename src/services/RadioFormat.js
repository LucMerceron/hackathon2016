var RadioFormat = {
	AtLeastOneSelected: function(array){
		return array.some(function(value){return value})
	},
}
module.exports = RadioFormat;