const express = require('express')
const router = express.Router()
const Poi = require('../models/poi')
const Jaunt = require('../models/jaunt')


// poi Index Route
// #delete? should only show in reference to the Jaunts
router.get('/', async (req, res, next) => {
	try {
		const foundPois = await Poi.find()
		res.render('poi/index.ejs', {
			pois: foundPois
		})
	}
	catch (err) {
		next(err)
	}
})

//poi New Route
// #remove? puts them into a standalone db that shouldn't exist afaik
/*router.get('/new', async (req, res, next) => {
	try {
		const foundJaunts = await Jaunt.find({})
		res.render('poi/new.ejs', {jaunts: foundJaunts})
	}
	catch (err) {
		next(err)
	}
})
*/
//poi Create Route
router.post('/', async (req, res, next) => {
	try {
		const jaunt = await Jaunt.findById(req.body.jauntId)
		jaunt.poi.push({
			title: req.body.title,
			photo: req.body.photo,
			description: req.body.description
			// this is an object that matches Poi Schema
		})
		await jaunt.save()
		res.redirect('/jaunts/' + jaunt._id)
	}
	catch (err) {	
		next(err)
	}
})

// poi show route
//# remove? shown on jaunt page
router.get('/jaunts/:id', async (req, res, next) => {
	try {
		 const foundPoi = await Poi.findById(req.params.id)
		res.render('poi/show.ejs', {
			poi: foundPoi
		})
	}
	catch (err) {
		next(err)
	}
})


//poi edit route
// #move to jaunt controller? or just somehow get it's 
// parent id to allow edits   
/*router.get('/:id/edit', async (req, res, next) => {
	try {
		console.log(req.params)
		const foundPoi = await Poi.findById(req.params.id)
		res.render('poi/edit.ejs', {
			poi: foundPoi
		})
	}
	catch (err) {
		next(err)
	}
})

//poi put route
router.put('/:id', async (req, res, next) => {
	try {
		const foundPoi = await Poi.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
			);
		res.redirect('/poi')
	}
	catch (err) {
		next(err)
	}
})
*/



module.exports = router;
