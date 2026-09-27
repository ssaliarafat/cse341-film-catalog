const express = require('express');

const router = express.Router();

router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));

module.exports = router;