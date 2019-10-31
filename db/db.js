const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost/jaunte'

mongoose.connect(connectionString, { 
	useNewUrlParser: true,
	useUnifiedTopology: true
	// create index
	// find and modify
})

mongoose.connection.on('connected', () => {
	console.log("connected to db: " + connectionString);
})

mongoose.connection.on('disconnected', () => {
	console.log("disconneted from db");
})

mongoose.connection.on('error', (error) => {
	console.log("error with db: ", error);
})
