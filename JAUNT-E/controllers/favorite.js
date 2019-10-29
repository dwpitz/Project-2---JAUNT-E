const express = require('express');
const router = express.Router()
const Favorite = require('../models/favorites')
const Jaunt = require('../models/jaunts')

// index route
router.get('/', async (req, res, next) => {
	if (req.session.loggedIn){
		try { 
			const foundFaves = await Favorite.find({})
			res.render('favorites/index.ejs', {faves: foundFaves})
		} catch(err) {
			next(err)
		}
	} else {
		console.log(req.session);
		res.redirect('../users/login')
	}
})

// new route
router.post('/', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.body.jauntId)
		const foundUser = await User.findById(req.session.Userid)
		const createdFave = await Favorite.create({jauntId: foundJaunt._id, title: foundJaunt.title, user: foundUser._id})
		console.log(createdFave)
		res.redirect('/jaunts')
	} catch(err) {
		next(err)	
	}
})
// delete route attached to the new route? Clicking the button adds or deletes the favorite record? 




module.exports = router