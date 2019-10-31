require('dotenv').config()
console.log(process.env)
const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

// const googleMapsClient = require('@google/maps')

/*const jsdom = require('jsdom') // attempting to incorporate DOM via node for Jquery to load google roads
const jquery = require('jquery') // attempting to load jquery to use google roads api code
*/

require('./db/db')

// middleware

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
/*app.use(jquery) // (window) ? for google roads api
*/
// controllers

const jauntController = require('./controllers/jaunt.js')
app.use('/jaunts', jauntController)

const favoriteController = require('./controllers/favorite.js')
app.use('/favorites', favoriteController)

const  poiController = require('./controllers/poi.js') 
app.use('/poi', poiController)

const userController = require('./controllers/user.js')
app.use('/users', userController)

// loading models for populating landing page
const Jaunt = require('./models/jaunts.js')
const Favorite = require('./models/favorites.js')
const User = require('./models/user.js')

// home page 
app.get('/', async (req, res, next) => {
	try {
		const findWaldo = await User.find({username: 'Waldo'})
		const foundJaunts = await Jaunt.find({})
		const foundFaves = await Favorite.find({user: findWaldo[0]._id})
		res.render('home.ejs', {jaunts: foundJaunts, faves: foundFaves})
	} catch(err) {
		next(err)
	}
})


app.listen(PORT, () => {
	console.log('Server is Listening On Port ' + PORT);	
})