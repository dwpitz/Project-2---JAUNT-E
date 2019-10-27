const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')

require('./db/db.js')

app.use(bodyParser.urlencoded({extended: false}))


const jauntController = require('./controllers/jaunt.js')
app.use('/jaunts', jauntController)

const  poiController = require('./controllers/poi.js')
app.use('/poi', poiController)




app.listen(PORT, () => {
	console.log('Server is Listening On Port ' + PORT);	
})