const express = require('express')
const router = express.Router()
const User = require('../models/user')

//user index route
router.get('/', async (req, res, next) => {
	try {
		const foundUser = await User.find()

		res.render('users/index.ejs', {
			users: foundUser
		})
	}
	catch (err) {
		next(err)
	}
})





module.exports = router