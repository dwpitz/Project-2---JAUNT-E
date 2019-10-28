const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Favorite = require('../models/favorites')

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

//user new route
router.get('/new', (req, res, next) => {
	try {
		res.render('users/new.ejs')
	}
	catch (err) {
		next(err)
	}
})

//user create route
router.post('/', async (req, res, next) => {
	try {
		const createdUser = await User.create(req.body)
		console.log(req.body)
		res.redirect('/users')
	}
	catch (err) {
		next(err)
	}
})

//user show route
router.get('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		res.render('users/show.ejs', {
			user: foundUser
		})
	}
	catch (err) {
		next(err)
	}
})

//user edit route
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		res.render('users/edit.ejs', {
			user: foundUser
		})
	}
	catch (err) {
		next(err)
	}
})

//user put route
router.put('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
			);
		res.redirect('/users')
	}
	catch (err) {
		next(err)
	}
})

//user delete route
router.delete('/:id', async (req, res, next) => {
	try {
		const deleteUser = await User.deleteOne({_id: req.params.id})
		res.redirect('/users')
	}
	catch (err) {
		next(err)
	}
})



module.exports = router