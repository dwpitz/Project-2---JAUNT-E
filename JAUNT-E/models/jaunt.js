const mongoose = require('mongoose')
const jauntSchema = new mongoose.Schema({
	user: {
	type: mongoose.Schema.Types.ObjectId, required: true
	}, //userID to relate to the jaunt
	title: {
		type: String, required: true
	},
	photo: {
		type: String, required: true
	},
	description: String,
	published: Boolean
})

const Jaunt = mongoose.model('Jaunt', jauntSchema)

module.exports = Jaunt;