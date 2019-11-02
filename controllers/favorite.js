const express = require('express');
const router = express.Router()
const Favorite = require('../models/favorite')
const Jaunt = require('../models/jaunt')
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

// new route, favoriting a Jaunt
router.post('/', async (req, res, next) => {
	if (req.session.loggedIn){
		try {
			const foundJaunt = await Jaunt.findById(req.body.jauntId)
			const foundUser = await User.findById(req.session.userId)
			// now accessible via both the Jaunt info and the User (who favorited)
			const alreadyFave = await Favorite.find({jauntId: foundJaunt._id, user: req.session.userId})
			const createdFave = await Favorite.create({jauntId: foundJaunt._id, title: foundJaunt.title, user: req.session.userId})
				console.log(createdFave)
			res.redirect('/jaunts')
		} catch(err) {
			next(err)	
		}
	} else {
		req.session.message = 'You must be logged in to favorite jaunts'
		res.redirect('../users/login')
	}
})


// delete route available on Jaunt show page, as 'Unfavorite'
router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn ){
		try {
			const foundJaunt = await Jaunt.findById(req.body.jauntId)
			const findFave = await Favorite.find({_id: req.params.id})
			const foundUser = await User.findById(req.session.userId)			
			const deletedFave = await Favorite.findByIdAndRemove(findFave)
			res.redirect('/jaunts')
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to favorite jaunts'
		res.redirect('../users/login')
	}
})


module.exports = router