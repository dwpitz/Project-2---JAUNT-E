const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./db/db')

app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// middleware
app.use(bodyParser.urlencoded({extended: false}))


const jauntController = require('./controllers/jaunt.js')
app.use('/jaunts', jauntController)

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