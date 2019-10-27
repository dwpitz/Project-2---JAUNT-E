const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./db/db.js')

app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))


const jauntController = require('./controllers/jaunt.js')
app.use('/jaunts', jauntController)

const  poiController = require('./controllers/poi.js')
app.use('/poi', poiController)




app.listen(PORT, () => {
	console.log('Server is Listening On Port ' + PORT);	
})