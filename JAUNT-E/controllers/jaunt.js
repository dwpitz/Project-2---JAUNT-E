const express = require('express')
const router = express.Router()
const Jaunt = require('../models/jaunts')

// index route, a list of jaunts available
// to be populated once users are created? or just with dummy info
// without ObjectId's from Users model?
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
		res.render('jaunts/new.ejs')
	} catch(err) {
		next(err)
	}
})

// create route
router.post('/', (req, res) => {
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

router.get('/:id', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.params.id)
		res.render('jaunts/show.ejs', {jaunt: foundJaunt})
	} catch(err) {
		res.send(err)
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


module.exports = router