const express = require('express');

const router = express.Router();

const reviewsController = require('../controllers/reviews');

router.get('/', reviewsController.getAll);

router.get('/:id', reviewsController.getSingle);

router.post('/', reviewsController.create);

router.put('/:id', reviewsController.update);

router.delete('/:id', reviewsController.remove);

module.exports = router;