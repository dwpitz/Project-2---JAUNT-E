const express = require('express')
const router = express.Router()
const Jaunt = require('../models/jaunts')
// including favorites here so as to aid in creating favorites?
const Favorite = require('../models/favorites')

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
router.get('/new', (req, res) => {

	res.render('jaunts/new.ejs', {
		userId: req.session.userId
	})
})

// create route
router.post('/', (req, res, next) => {
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
})




// show route for jaunt

router.get('/:id', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.params.id)
		console.log(foundJaunt)
		
		res.render('jaunts/show.ejs', {jaunt: foundJaunt})
		console.log(foundJaunt);
	} catch(err) {
		next(err)
	}
})

// edit route for jaunt
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.params.id)
		res.render('jaunts/edit.ejs', {jaunt: foundJaunt})	
	} catch(err){
		next(err)
	}
})

// update route for jaunt
router.put('/:id', (req, res, next) => {
	try {
		Jaunt.findByIdAndUpdate(req.params.id, req.body, (err, updatedJaunt) => {
			if (err) {
				res.send(err)
			} else {
				res.redirect('/jaunts')
			}		    
		})
	} catch(err){
		next(err)
	}
})

// delete route for jaunt
router.delete('/:id', (req, res, next) => {
	try {
		Jaunt.findByIdAndRemove(req.params.id, (err, deletedJaunt) => {
		    if (err) {
		    	res.send(err)
		    } else {
		    	console.log(deletedJaunt, ' was deleted')
		    	res.redirect('/jaunts')
		    }
		})
	} catch(err){
		next(err)
	}
})


module.exports = router