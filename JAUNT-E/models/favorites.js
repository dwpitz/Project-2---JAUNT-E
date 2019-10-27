const mongoose = require('mongoose')
const favoriteSchema = new mongoose.Schema({
	    user: String, /*{
	type: mongoose.Schema.Types.ObjectId, required: true
	} // once we integrate users with id's */
	    jauntId: {type: mongoose.Schema.Types.ObjectId, required: true
	}
})


const Favorite = mongoose.model('Favorite', favoriteSchema)

module.export = Favorite