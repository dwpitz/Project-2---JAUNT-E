const mongoose = require('mongoose')
const favoriteSchema = new mongoose.Schema({
	    user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User' 
		}, // once we integrate users with id's 
	    jauntId: {
	    	type: mongoose.Schema.Types.ObjectId,
	    	ref: 'Jaunt'
	    },
	     title: String    
})


const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite