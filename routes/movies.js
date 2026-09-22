const express = require('express');

const router = express.Router();

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.create);

router.put('/:id', moviesController.update);

router.delete('/:id', moviesController.remove);

module.exports = router;