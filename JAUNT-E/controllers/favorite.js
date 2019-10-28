const express = require('express');
const router = express.Router()
const Favorite = require('../models/favorites')
const Jaunt = require('../models/jaunts')

// index route
router.get('/', async (req, res, next) => {
	try { 
		const foundFaves = await Favorite.find({})
		res.render('favorites/index.ejs', {faves: foundFaves})
	} catch(err) {
		next(err)
	}
})

// new route
router.post('/', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.body.jauntId)
		const createdFave = await Favorite.create({jauntId: req.body.jauntId, title: foundJaunt.title})
		console.log(createdFave)
		res.redirect('/jaunts')
	} catch(err) {
		next(err)	
	}
/*	Favorite.create({jauntId: req.body.jauntId, title: req.body.title}, (err, createdFave) => {
	    if (err) {
	    	console.log(err)
	    } else {
	    	console.log(createdFave)
	    	res.redirect('/jaunts')
	    }  
	})*/

})
// delete route attached to the new route? Clicking the button adds or deletes the favorite record? 




module.exports = router