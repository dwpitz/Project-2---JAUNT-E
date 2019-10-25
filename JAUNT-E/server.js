const express = require('express')
const app = express()
const PORT = 3000

require('./db/db.js')


const jauntController = require('./controllers/jaunt.js')






app.listen(PORT, () => {
	console.log('Server is Listening On Port ' + PORT);	
})