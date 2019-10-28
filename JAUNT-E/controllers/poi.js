const express = require('express')
const router = express.Router()
const Poi = require('../models/poi')



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
router.get('/new', (req, res, next) => {
	try {
		res.render('poi/new.ejs')
	}
	catch (err) {
		next(err)
	}
})

//poi Create Route
router.post('/', async (req, res, next) => {
	try {
		const createdPoi = await Poi.create(req.body)
		console.log(req.body);
		res.redirect('/poi')
	}
	catch (err) {
		next(err)
	}
})


// poi show route
router.get('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
	try {
		const deletePoi = await Poi.deleteOne({_id: req.params.id})
		console.log(deletePoi);
		res.redirect('/poi')
	}
	catch (err) {
		next(err)
	}
})





module.exports = router;
