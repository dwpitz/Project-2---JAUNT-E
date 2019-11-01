
const express = require('express')
const router = express.Router()
const Poi = require('../models/poi')
const Jaunt = require('../models/jaunts')



//poi Index Route
router.get('/', async (req, res, next) => {
	try {
		//this is the request to the db
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
router.get('/new', async (req, res, next) => {
	try {
		const foundJaunts = await Jaunt.find({})
		res.render('poi/new.ejs', {jaunts: foundJaunts})
	}
	catch (err) {
		next(err)
	}
})

//poi Create Route
router.post('/', async (req, res, next) => {
	try {
		console.log("req.body");
		console.log(req.body)
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
router.get('/jaunts/:id', async (req, res, next) => {
	try {
		// const foundPoi = await Poi.findById(req.params.id)
		// console.log(foundPoi);
		res.render('poi/show.ejs', {
			poi: foundPoi
		})
	}
	catch (err) {
		next(err)
	}
})

//poi edit route
router.get('/:id/edit', async (req, res, next) => {
	try {
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

//poi delete route
//we need to delete the poi that's a subdocument of the jaunt
router.delete('/:id', async (req, res, next) => {
	try {
		console.log(req.body, ' is req.body')
		console.log(req.params, ' is req.params')
		const foundPoi = await Poi.find(req.params._id)
		console.log(foundPoi)
		const foundJaunt = await Jaunt.find({poi: {$in: [req.params._id]}})
		console.log(foundJaunt, 'is the jaunt found via reverse-search')
		const foundAgainJaunt = await Jaunt.findOne({poi: {$in: ['5db9e24f2dd48247f0c26f35']}})
		res.redirect('/poi')
	}
	catch (err) {
		next(err)
	}
})





module.exports = router;
