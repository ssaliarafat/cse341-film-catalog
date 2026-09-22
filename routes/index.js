const express = require('express');

const router = express.Router();

router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));

module.exports = router;