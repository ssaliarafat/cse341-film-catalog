const express = require('express');

const router = express.Router();

/* 
   #swagger.tags = ['Users']
   #swagger.description = 'Returns information about the currently authenticated user.'
   #swagger.responses[401] = {
       description: 'Authentication required'
   }
*/
router.get('/me', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: 'Authentication required'
        });
    }

    res.status(200).json({
        authenticated: true,
        user: {
            id: req.user._id,
            name: req.user.displayName,
            username: req.user.username,
            email: req.user.email
        }
    });
});

module.exports = router;