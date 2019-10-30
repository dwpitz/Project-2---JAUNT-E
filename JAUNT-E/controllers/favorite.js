const express = require('express');
const router = express.Router()
const Favorite = require('../models/favorites')
const Jaunt = require('../models/jaunts')
const User = require('../models/user')

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
	if (req.session.loggedIn){
		try {
			const foundJaunt = await Jaunt.findById(req.body.jauntId)
			const foundUser = await User.findById(req.session.userId)
			const alreadyFave = await Favorite.find({jauntId: foundJaunt._id, user: foundUser._id})
			if (!alreadyFave) {
				const createdFave = await Favorite.create({jauntId: foundJaunt._id, title: foundJaunt.title, user: foundUser._id})
				console.log(createdFave)
				res.redirect('/jaunts')
			} else {
				// unfavorite logic
				// 

				console.log('here is where we put unfavorite logic')
				res.redirect('/jaunts')
			}
		} catch(err) {
			next(err)	
		}
	} else {
		req.session.message = 'You must be logged in to favorite jaunts'
		res.redirect('../users/login')
	}
})


// delete route available on Jaunt show page
router.delete('/:id', async (req, res, next) => {
/*	console.log('hitting unfavorite route')
	const alreadyFave = await Favorite.find({userId: req.session.userId, jauntId: req.body.id})
	console.log(alreadyFave, 'is already a favorite')
*/	if (req.session.loggedIn ){//&& alreadyFave){
		try {
			const deletedFave = await Favorite.findByIdAndRemove(req.params.id)
			console.log(deletedFave)
			res.redirect('/jaunts')
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to favorite jaunts'
		res.redirect('../users/login')
	}
})
// delete route attached to the new route? The button becomes an undelete when it is shown to have been in db? 




module.exports = router