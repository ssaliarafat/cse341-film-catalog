const express = require('express');

const router = express.Router();

const moviesController = require('../controllers/movies');
const isAuthenticated = require('../middleware/auth');

/* #swagger.tags = ['Movies'] */
router.get('/', moviesController.getAll);

/* #swagger.tags = ['Movies'] */
router.get('/:id', moviesController.getSingle);

/* 
   #swagger.tags = ['Movies']
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.post('/', isAuthenticated, moviesController.create);

/* 
   #swagger.tags = ['Movies']
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.put('/:id', isAuthenticated, moviesController.update);

/* 
   #swagger.tags = ['Movies']
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.delete('/:id', isAuthenticated, moviesController.remove);

module.exports = router;