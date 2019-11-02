const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Favorite = require('../models/favorite')
const bcryptjs = require('bcryptjs')
const Jaunt = require('../models/jaunt')

//user index route
// should we get rid of this, or only make it accessible to admins maybe?
router.get('/', async (req, res, next) => {
		if(req.session.loggedIn){
			try {
				const foundFaves = await Favorite.find()
				const foundUser = await User.findById(req.session.userId)
				res.redirect('/users/'+foundUser._id)
			}
			catch (err) {
				next(err)
			}}
		else{
			res.redirect('/users/login')
		}
})

//Login Page
router.get('/login', (req, res) => {

	// announcing errors to the user on the ejs page
	let messageToShow = ''
	if(req.session.message){
		messageToShow = req.session.message
		req.session.message = ''
	}

	res.render('users/login.ejs', {
		message: messageToShow
	})
})

// login post
router.post('/login', async (req, res, next) => {
	try {
		const foundUsers = await User.find({
			username: req.body.username
		})
		// testing if the username is in the database
		if(foundUsers.length === 0) {
			req.session.message = 'Invalid username or password'
			res.redirect('/users/login')
		} else {
			const pw = req.body.password
			// hashing the password
			if(bcryptjs.compareSync(pw, foundUsers[0].password)) {
				req.session.loggedIn = true
				req.session.username = foundUsers[0].username
				req.session.userId = foundUsers[0]._id
				res.redirect('/users/'+req.session.userId)
			} else {
				// if the password doesn't match hashed password in database
				req.session.message = 'Invalid username or password'
				res.redirect('/users/login')
			}
		}
	} catch(err){
		next(err)
	}
})


//Registration Route - Get
router.get('/register', (req, res, next) => {
	try {
		res.render('users/new.ejs')
	}
	catch (err) {
		next(err)
	}
})

//Registration Route - put
router.post('/', async (req, res, next) => {
	try {
		const userSearch = await User.findOne({username: req.body.username})
		// checking if username is taken already, redirecting if so.
		if (userSearch !== null) {
			req.session.message = 'Username is taken!'
			res.redirect('/')
		} else {
			const pw = req.body.password
			const hashedPassword = bcryptjs.hashSync(pw, bcryptjs.genSaltSync(10))
			const createdUser = await User.create({username: req.body.username, password: hashedPassword})
			console.log('\nhere is the created user in POST /users')
			console.log(createdUser)
			// use session to make user be 'logged in'
			req.session.loggedIn = true
			req.session.userId = createdUser._id	
			req.session.username = createdUser.username
			res.redirect('/')
		}
	}
	catch (err) {
		next(err)
	}
})

// user logout route
router.get('/logout', (req, res) => {
	// destroy session at logout
	try {
		req.session.destroy()		
		res.redirect('/')
	} catch(err) {
		next(err)
	}
})


//user show route, profile page
router.get('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const foundFaves = await Favorite.find({user: req.session.userId})
			const foundJaunts = await Jaunt.find({user: req.session.userId})
			console.log(foundJaunts)
			res.render('users/show.ejs', {
				faves: foundFaves, jaunts: foundJaunts, user: req.session
			})
		}
		catch (err) {
			next(err)
		}
	} else {
			res.redirect('../')
	}
})


//user delete route
router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn){
		try {
			// gotta remove affiliated faves
	
			const deletedFaves = await Favorite.deleteMany({user: req.params.id})
			console.log('\n affiliated faves with this user to be deleted ', deletedFaves)
			const deleteUser = await User.deleteOne({
				_id: req.params.id})
			res.redirect('/users/login')
		}
		catch (err) {
			next(err)
		}
	} else {
			req.session.message = 'You must be logged in to do that'
			res.redirect('/users/login')
	}

})



module.exports = router