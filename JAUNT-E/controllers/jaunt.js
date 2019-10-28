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
router.get('/new', (req, res, next) => {
	try {
		res.render('jaunts/new.ejs')
	} catch(err) {
		next(err)
	}
})

// create route
router.post('/', (req, res, next) => {
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
		next(err)
	}
})


router.get('/testcreate', async (req, res, next) => {
	const j = await Jaunt.findById('5db4b11a9bd15d2b05aad358')
	j.poi.push({
		title: 'asdf',
		photo: 'asdf',
		description: 'asdf'
	})
	await j.save()
	res.redirect('/jaunts/5db4b11a9bd15d2b05aad358')
})

// show route for jaunt

router.get('/:id', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.params.id)
		console.log(foundJaunt)
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
router.put('/:id', (req, res, next) => {
	try {
		Jaunt.findByIdAndUpdate(req.params.id, req.body, (err, updatedJaunt) => {
			if (err) {
				res.send(err)
			} else {
				console.log(updatedJaunt)
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