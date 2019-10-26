const mongoose = require('mongoose')
const jauntSchema = new mongoose.Schema({
	user: String/*{
	type: mongoose.Schema.Types.ObjectId, required: true
	}*/,
	location: String, // at this point just a map with the coordinates already loaded in to plug into the window on the page for googlemaps to present
	title: String/*{
		type: String, required: true
	}*/,
	photo: String /*{
		type: String, required: true
	}*/,
	description: String,
	published: Boolean
	})

const Jaunt = mongoose.model('Jaunt', jauntSchema)


module.exports = Jaunt