
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
		const createdPoi = await Poi.create(req.body)
		const jauntId = await Jaunt.findById(req.body.jauntId)
		jauntId.poi.push(createdPoi)
		jauntId.save((err) => {
			if(err) next(err)
		})
		console.log(createdPoi);
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
//we need to delete the poi that's a subdocument of the jaunt
router.delete('/:id', async (req, res, next) => {
	try {
		//finds all of the Jaunts...
		console.log(req.params, ' is req params');
		const foundPoi = await Poi.find(req.params._id)
		const removePoi = await Jaunt.poi.id(req.params._id).remove()
		console.log(removePoi);

		
		



		//find the jaunt with a specific poi ID.
		// const foundPoi = await Poi.find({foundJaunt, _id: '5db8594e60f4639dcc7feb90'})
		// console.log(foundPoi);
		//remove the poi ID from the jaunt


		// console.log(Poi.find({foundJaunt, _id: '5db8594e60f4639dcc7feb90'}), 'the id of POI');
		// const deletePoi = await Poi.deleteOne({_id: req.params.id})
		// console.log(deletePoi, 'deletePoi');
		// jauntId.poi.push(createdPoi)
		// console.log(createdPoi, 'createdPoi')
		// jauntId.save((err) => {
		// 	if(err) next(err)
		// })
		// console.log(deletePoi);
		// res.redirect('/poi')
	}
	catch (err) {
		next(err)
	}
})





module.exports = router;
