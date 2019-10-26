const express = require('express')
const router = express.Router()
const Jaunt = require('../models/jaunt.js')

// index route, a list of jaunts available
// to be populated once users are created? or just with dummy info
// without ObjectId's from Users model?
router.get('/', (req, res, next) => {
	try {
		res.render('jaunts/index.ejs')
	} catch(err) {
		next(err)
	}
})

module.exports = router