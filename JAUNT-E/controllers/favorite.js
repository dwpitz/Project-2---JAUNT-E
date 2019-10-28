const express = require('express');
const router = express.Router()
const Favorite = require('../models/favorites')
const Jaunt = require('../models/jaunts')

// index route
router.get('/', (req, res, next) => {
	res.render('favorites/index.ejs')
})

// new route
router.post('/', (req, res) => {
console.log(req.body)
res.redirect('favorites')
// will be present on the jaunt show page
// will grab the session info to get the logged in user id
// will grab the req.body to get the Jaunt id 
// this is fine for now with the dummed down model accepting strings
/*	Favorite.create(req.body, (err, createdFave) => {
	    if (err) {
	    	console.log(err)
	    } else {
	    	console.log(createdFave)
	    	res.redirect('/jaunts')
	    }  
	})*/
})

module.exports = router