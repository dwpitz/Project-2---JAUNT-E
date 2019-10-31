const express = require('express');
const router = express.Router()
const googleMapsClient = require('@google/maps')
const secretInfo = require('./secretinfo.js')

router.get('/google', (req, res) => {
	const googleMapsClient = await createClient({
  		key: mapApi
  	})
    googleMapsClient.geocode({
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, (err, response) => {
        if (!err) {
            console.log(response.json.results);
        }
        res.render('google.ejs')
    })
});

