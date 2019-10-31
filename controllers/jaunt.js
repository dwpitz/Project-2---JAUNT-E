const express = require('express')
const router = express.Router()
const Jaunt = require('../models/jaunts')
const Favorite = require('../models/favorites')
const User = require('../models/user')

// index route, a list of jaunts available
router.get('/', async (req, res, next) => {
	try {
		const foundJaunts = await Jaunt.find({})
		res.render('jaunts/index.ejs', {jaunts: foundJaunts})
	} catch(err) {
		next(err)
	}
})


// new route
router.get('/new', (req, res, next) => {
	if (req.session.loggedIn){
			try {
				res.render('jaunts/new.ejs', {
					userId: req.session.userId
				})
			} catch(err) {
				next(err)
			}
		}
	else {
		req.session.message = 'You must be logged in to add jaunts'
		res.redirect('../users/login')
	}
})

// create route
router.post('/', async (req, res, next) => {
	if (req.session.loggedIn){
		try {		
			Jaunt.create(req.body, (err, createdJaunt) => {
			    if (err){
			    	next(err)
			    } else {
					console.log(createdJaunt)
					res.redirect('/jaunts')    	
			    }
			})
		} catch(err) {
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to create jaunts'
		res.redirect('../users/login')
	}
})

// get route for google map practice
router.get('/googlemappractice', (req, res, next) => {
	try {
		res.render('googlemapspractice.ejs')	
	} catch(err){
		next(err)
	}
})


// show route for jaunt, including showing Places of Interest
router.get('/:id', async (req, res, next) => {
	try {
		const foundFave = await Favorite.find({jauntId: req.params.id})
		const foundJaunt = await Jaunt.findById(req.params.id)
		const foundUser = await User.findById(foundJaunt.user)

		res.render('jaunts/show.ejs', {
			jaunt: foundJaunt,
			fave: foundFave[0],
			username: foundUser.username
		})

	} catch(err) {
		next(err)
	}
})

// edit route for jaunt
router.get('/:id/edit', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const foundJaunt = await Jaunt.findById(req.params.id)
			res.render('jaunts/edit.ejs', {jaunt: foundJaunt})	
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to edit jaunts'
		res.redirect('/users/login')
	} 
})

// update route for jaunt
router.put('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const updatedJaunt = await Jaunt.findByIdAndUpdate(req.params.id, req.body)
			console.log(updatedJaunt)
			res.redirect('/jaunts')		    
		} catch(err){
			next(err)
		}
	} else {
		req.session.messaage = 'You must be logged in to update jaunts'
		res.redirect('../users/login')	
	}
})

// delete route for jaunt
router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn){
		try {
			console.log('\n req.params.title ', req.params)
			const foundJaunt = await Jaunt.find({_id: req.params.id})
			console.log('\n foundJaunt ',foundJaunt)
			const deletedFaves = await Favorite.find({jauntId: foundJaunt})
			console.log('\n faves affiliated with this jaunt ',deletedFaves)
/*			const deletedJaunt = await Jaunt.findByIdAndRemove(req.params.id)
		  	console.log(deletedJaunt, ' was deleted')
*/	    	res.redirect('/jaunts')
		} catch(err){
			next(err)
		}
	} else {
		req.session.message = 'You must be logged in to delete jaunts'
		res.redirect('../users/login')
	}
})

// // delete route for jaunt
// router.delete('/:id/:index', async (req, res, next) => {
// 	try {

		
		



// 		//find the jaunt with a specific poi ID.
// 		// const foundPoi = await Poi.find({foundJaunt, _id: '5db8594e60f4639dcc7feb90'})
// 		// console.log(foundPoi);
// 		//remove the poi ID from the jaunt


// 		// console.log(Poi.find({foundJaunt, _id: '5db8594e60f4639dcc7feb90'}), 'the id of POI');
// 		// const deletePoi = await Poi.deleteOne({_id: req.params.id})
// 		// console.log(deletePoi, 'deletePoi');
// 		// jauntId.poi.push(createdPoi)
// 		// console.log(createdPoi, 'createdPoi')
// 		// jauntId.save((err) => {
// 		// 	if(err) next(err)
// 		// })
// 		// console.log(deletePoi);
// 		// res.redirect('/poi')

// 		// console.log(req.params, ' is req.params')
// 		const foundPoi = await Jaunt.find(req.params._id)
// 		console.log(foundPoi, 'foundPoi');
// 		// const foundIndex = await foundPoi(req.params.index)
// 		// console.log(foundIndex, 'this is the');
// 		// const foundPoi = await Poi.find(req.params._id)
// 		// console.log(foundPoi)
// // 		const foundJaunt = await Jaunt.find({poi: {$in: [req.params._id]}})
// // 		console.log(foundJaunt, 'is the jaunt found via reverse-search')
// // 		const foundAgainJaunt = await Jaunt.findOne({poi: {$in: ['5db9e24f2dd48247f0c26f35']}})
// // /*		const foundJaunts = await Jaunt.find({})

// 		// const removePoi = await foundJaunt.poi.id(req.params.id).remove()
// 		// console.log(deletePoi);
// 		// res.redirect('/poi')

// 	}
// 	catch (err) {
// 		next(err)
// 	}
// })


router.delete('/:id/:index', async (req, res, next) => {
	try {	
		const foundJaunt = await Jaunt.findById(req.params.id)
		const poiIndex = req.params.index
		foundJaunt.poi.splice(poiIndex, 1)

		console.log(foundJaunt.poi);
		foundJaunt.save()
		res.redirect('/jaunts/'+ req.params.id)

		//find the jaunt
		//splice it out of the array
		//save the jaunt 
	}
	catch (err) {
		next(err)
	}
})

// show route for poi
router.get('/:id/:index', async (req, res, next) => {
	try {
		const foundJaunt = await Jaunt.findById(req.params.id)
		res.render('poi/show.ejs', {poi: foundJaunt.poi[req.params.index]})		
	} catch(err){
		next(err)
	}
})


module.exports = router