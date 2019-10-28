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
router.post('/', (req, res) => {
	console.log(req.body)
	// will be present on the jaunt show page
	// will grab the session info to get the logged in user id
	// this is fine for now with the dummed down model accepting strings
/*	Favorite.create({jauntId: req.body._id, title: req.body.title}, (err, createdFave) => {
	    if (err) {
	    	console.log(err)
	    } else {
	    	console.log(createdFave)
	    	res.redirect('/jaunts')
	    }  
	})*/
	res.redirect('/jaunts')
})
// delete route attached to the new route? Clicking the button adds or deletes the favorite record? 




module.exports = router