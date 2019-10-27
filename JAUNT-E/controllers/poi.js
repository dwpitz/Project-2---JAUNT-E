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
router.get('/new', async (req, res, next) => {
	try {
		res.render('poi/new.ejs')
	}
	catch (err) {
		next(err)
	}
})


//poi show route
// router.get('/', (req, res) => {
//   res.render('poi/show.ejs');
// })



module.exports = router;
