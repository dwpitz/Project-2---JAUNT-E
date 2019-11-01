const mongoose = require('mongoose')
const poiSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true
	},
	photo: {
		type: String, 
		// required: true
	},
	description: {
		type: String, 
		required: true
	}
})

const Poi = mongoose.model('Poi', poiSchema)

module.exports = Poi;
