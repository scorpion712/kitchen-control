const express = require('express');
const ctrlTakesOut = require('../controller/ctrlTakesOut');

const router = express.Router();

// takes out from stock router
router.get('/takesout', ctrlTakesOut.fetchTakesOut); // route get all registered takes out 
router.post('/takesout', ctrlTakesOut.addTakeOut);

module.exports = router;