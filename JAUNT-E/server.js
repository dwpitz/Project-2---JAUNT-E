const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const secretInfo = require('./secretinfo.js')

require('./db/db')

// middleware


app.use(session({
	secret: secretInfo,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))


// controllers

const jauntController = require('./controllers/jaunt.js')
app.use('/jaunts', jauntController)

const favoriteController = require('./controllers/favorite.js')
app.use('/favorites', favoriteController)

const  poiController = require('./controllers/poi.js')
app.use('/poi', poiController)

const userController = require('./controllers/user.js')
app.use('/users', userController)


app.get('/', (req, res, next) => {
	try {
		res.render('home.ejs')
	} catch(err) {
		next(err)
}
})


app.listen(PORT, () => {
	console.log('Server is Listening On Port ' + PORT);	
})