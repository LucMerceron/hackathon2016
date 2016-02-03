var ImageFormat = {
	isPngOrJpg: function(file){
		return file.type == 'image/png' || file.type == 'image/jpeg';
	},
	isLessThanOneMega: function(file){
		return file.size < 1000000
	},
	isLessThanThreeMega: function(file){
		return file.size < 3000000
	},
	isLessThanFiveMega: function(file){
		return file.size < 5000000
	}
}
module.exports = ImageFormat;