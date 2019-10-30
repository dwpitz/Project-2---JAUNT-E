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
	try {
		res.render('jaunts/new.ejs', {
			userId: req.session.userId
		})
	} catch(err) {
		next(err)
	}
})

// create route
router.post('/', async (req, res, next) => {
	if (req.session.loggedIn){
		try {		
			// get user object from db based on username in session
			// {
			// 	user: foundUser
			// 	title: 
			// 	descript:
			// 	asdf: req.body.asdf
			// }
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
		console.log(foundFave, 'found fave')
		console.log(req.params, 'logging params');
		const foundJaunt = await Jaunt.findById(req.params.id)
		console.log('\nJaunt found by req.params.id', foundJaunt);
		console.log('\n userId from jaunt ', foundJaunt.user)
		const foundUser = await User.findById(foundJaunt.user)
		console.log('\n username found', foundUser.username)
		// const foundJaunt = await Jaunt.findById(req.params.id).populate('user').exec()
		// console.log(foundJaunt, 'found jaunt')
		res.render('jaunts/show.ejs', {
			jaunt: foundJaunt,
			faveId: foundFave._id,
			username: foundUser.username
		})

	} catch(err) {
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
			const deletedJaunt = await Jaunt.findByIdAndRemove(req.params.id)
		  	console.log(deletedJaunt, ' was deleted')
	    	res.redirect('/jaunts')
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to delete jaunts'
		res.redirect('../users/login')
	}
})


module.exports = router