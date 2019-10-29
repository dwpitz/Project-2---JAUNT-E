const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Favorite = require('../models/favorites')
const bcryptjs = require('bcryptjs')

//user index route
router.get('/', async (req, res, next) => {
	try {
		const foundUser = await User.find()
		res.render('users/index.ejs', {
			users: foundUser
		})
		req.session.mousetrap = 'Greg'
	}
	catch (err) {
		next(err)
	}
})

//Login Page
router.get('/login', (req, res) => {
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

		if(foundUsers.length === 0) {
			console.log('Username Does Not Exist');
			req.session.message = 'Invalid username or password'
			res.redirect('/users/login')
		} else {
			const pw = req.body.password
			console.log(foundUsers[0])
			if(bcryptjs.compareSync(pw, foundUsers[0].password)) {
				req.session.loggedIn = true
				req.session.username = foundUsers[0].username
				res.redirect('/')
			} else {
				console.log('bad password');
				req.session.message = 'Invalid username or password'
				res.redirect('/users/login')
			}
		}



	// 	req.session.username = req.body.username;
	// 	req.session.logged = true
	// 	console.log(req.session)
	// 	res.redirect('/users')	
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

//Registration Route - post
router.post('/', async (req, res, next) => {
	try {
		const userSearch = await User.findOne({username: req.body.username})
		console.log('\nhere is what we found when trying to see if user name exists POST /users')
		console.log(userSearch)
		if (userSearch !== null) {
			console.log('username is taken')
			req.session.message = 'Username is taken!'
			res.redirect('/register')
		} else {
			const pw = req.body.password
			const hashedPassword = bcryptjs.hashSync(pw, bcryptjs.genSaltSync(10))
			console.log(hashedPassword)
			const createdUser = await User.create({username: req.body.username, password: hashedPassword})
			console.log('\nhere is the created user in POST /users')
			console.log(createdUser)
			// use session to make user be 'logged in'
			req.session.logged = true
			// use the username from the db
			req.session.username = createdUser.username
			res.redirect('/')
		}
/*		const createdUser = await User.create(req.body)
		console.log(req.body)
		res.redirect('/users')
*/	}
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

// user logout route
router.get('/logout', (req, res) => {
	req.session.destroy(function(err) {
		if (err) {
			console.log(err)
		} else {
			res.redirect('/')
		}
	})
})


module.exports = router