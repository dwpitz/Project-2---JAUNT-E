const mongoose = require('mongoose')
const favoriteSchema = new mongoose.Schema({
	    user: String, /*{
	type: mongoose.Schema.Types.ObjectId, required: true
	} // once we integrate users with id's */
	    jauntId: mongoose.Schema.Types.ObjectId,
	    title: String
})


const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite