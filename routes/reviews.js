const express = require('express');

const router = express.Router();

const reviewsController = require('../controllers/reviews');
const isAuthenticated = require('../middleware/auth');

/* #swagger.tags = ['Reviews'] */
router.get('/', reviewsController.getAll);

/* #swagger.tags = ['Reviews'] */
router.get('/:id', reviewsController.getSingle);

/* 
   #swagger.tags = ['Reviews']
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.post('/', isAuthenticated, reviewsController.create);

/* 
   #swagger.tags = ['Reviews']
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.put('/:id', isAuthenticated, reviewsController.update);

/* 
   #swagger.tags = ['Reviews']
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.delete('/:id', isAuthenticated, reviewsController.remove);

module.exports = router;