const express = require('express')
const router = express.Router()
const Jaunt = require('../models/jaunts')
const Favorite = require('../models/favorites')
const User = require('../models/user')

// index route, a list of jaunts available
router.get('/', async (req, res, next) => {
	try {
		const foundJaunts = await Jaunt.find({})
		res.render('jaunts/index.ejs', {jaunts: foundJaunts})
	} catch(err) {
		next(err)
	}
})


// new route
router.get('/new', (req, res, next) => {
	if (req.session.loggedIn){
			try {
				res.render('jaunts/new.ejs', {
					userId: req.session.userId
				})
			} catch(err) {
				next(err)
			}
		}
	else {
		req.session.message = 'You must be logged in to add jaunts'
		res.redirect('../users/login')
	}
})

// create route
router.post('/', async (req, res, next) => {
	if (req.session.loggedIn){
		try {		
			Jaunt.create(req.body, (err, createdJaunt) => {
			    if (err){
			    	next(err)
			    } else {
					console.log(createdJaunt)
					res.redirect('/jaunts')    	
			    }
			})
		} catch(err) {
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to create jaunts'
		res.redirect('../users/login')
	}
})

// get route for google map practice
router.get('/googlemappractice', (req, res, next) => {
	try {
		res.render('googlemapspractice.ejs')	
	} catch(err){
		next(err)
	}
})


// show route for jaunt, including showing Places of Interest
router.get('/:id', async (req, res, next) => {
	try {
		const foundFave = await Favorite.find({jauntId: req.params.id})
		const foundJaunt = await Jaunt.findById(req.params.id)
		console.log('\n favorites found ',foundFave)
		res.render('jaunts/show.ejs', {
			jaunt: foundJaunt,
			fave: foundFave[0]
		})

	} catch(err) {
		next(err)
	}
})

// edit route for jaunt
router.get('/:id/edit', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const foundJaunt = await Jaunt.findById(req.params.id)
			res.render('jaunts/edit.ejs', {jaunt: foundJaunt})	
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to edit jaunts'
		res.redirect('/users/login')
	} 
})

// update route for jaunt
router.put('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const updatedJaunt = await Jaunt.findByIdAndUpdate(req.params.id, req.body)
			console.log(updatedJaunt)
			res.redirect('/jaunts')		    
		} catch(err){
			next(err)
		}
	} else {
		req.session.messaage = 'You must be logged in to update jaunts'
		res.redirect('../users/login')	
	}
})

// delete route for jaunt
router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn){
		try {
			const foundJaunt = await Jaunt.find({_id: req.params.id})
			const deletedFaves = await Favorite.findByIdAndRemove({jauntId: foundJaunt})
			const deletedJaunt = await Jaunt.findByIdAndRemove(req.params.id)
	    	res.redirect('/jaunts')
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to delete jaunts'
		res.redirect('../users/login')
	}
})

router.delete('/:id/:index', async (req, res, next) => {
	try {	
		const foundJaunt = await Jaunt.findById(req.params.id)
		const poiIndex = req.params.index
		foundJaunt.poi.splice(poiIndex, 1)

		console.log(foundJaunt.poi);
		foundJaunt.save()
		res.redirect('/jaunts/'+ req.params.id)

		//find the jaunt
		//splice it out of the array
		//save the jaunt 
	}
	catch (err) {
		next(err)
	}
})

// show route for poi
router.get('/:id/:index', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.params.id)
		res.render('poi/show.ejs', {poi: foundJaunt.poi[req.params.index]})		
	} catch(err){
		next(err)
	}
})


module.exports = router