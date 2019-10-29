const mongoose = require('mongoose')
const Poi = require('./poi.js')

const jauntSchema = new mongoose.Schema({
	// try to grab this from the session.userId, which is set at login/registration
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User' 
	},
	location: String, // at this point just a map with the coordinates already loaded in to plug into the window on the page for googlemaps to present
	title: String/*{
		type: String, required: true
	}*/,
	photo: String /*{
		type: String, required: true
	}*/,
	description: String,
	published: Boolean,
	poi: [Poi.schema]
	//subdoc for POI
})

const Jaunt = mongoose.model('Jaunt', jauntSchema)


module.exports = Jaunt