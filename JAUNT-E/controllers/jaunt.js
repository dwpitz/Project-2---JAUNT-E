const express = require('express')
const router = express.Router()
const Jaunt = require('../models/jaunts')

// index route, a list of jaunts available
// to be populated once users are created? or just with dummy info
// without ObjectId's from Users model?
router.get('/', (req, res, next) => {
	try {
		res.render('jaunts/index.ejs')
	} catch(err) {
		next(err)
	}
})


// new route
router.get('/new', (req, res, next) => {
	try {
		res.render('jaunts/new.ejs')
	} catch(err) {
		next(err)
	}
})

// create route
router.post('/', (req, res) => {
	/*Jaunt.create(req.body, (err, createdJaunt) => {
	    if (err) {
	    	console.log(err)
	    } else {
	    	console.log(createdJaunt)
	    	res.redirect('/jaunts')
	    }
	})*/
	try {
		Jaunt.create(req.body, (err, createdJaunt) => {
		    if (err){
		    	res.send(err, 'this is your error, dummy')
		    } else {
				console.log(createdJaunt)
				res.redirect('/jaunts')    	
		    }
		})
		
	} catch(err) {
		res.send(err)
	}
})



// show route for jaunt





module.exports = router