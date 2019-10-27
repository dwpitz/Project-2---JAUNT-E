const express = require('express')
const router = express.Router()
const Poi = require('../models/poi')


//poi show route
router.get('/', (req, res) => {
  res.render('poi/show.ejs');
})



module.exports = router;
