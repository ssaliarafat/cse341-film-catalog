const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

/* 
   #swagger.tags = ['Authentication']
   #swagger.description = 'Starts GitHub OAuth login.'
*/
router.get(
    '/login',
    passport.authenticate('github', {
        scope: ['user:email']
    })
);

/* 
   #swagger.tags = ['Authentication']
   #swagger.description = 'GitHub OAuth callback. Creates or updates the authenticated user session.'
*/
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: req.user._id,
                name: req.user.displayName,
                username: req.user.username,
                email: req.user.email
            }
        });
    }
);

/* 
   #swagger.tags = ['Authentication']
   #swagger.description = 'Logs the authenticated user out and destroys the session.'
*/
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        req.session.destroy((sessionError) => {
            if (sessionError) {
                return next(sessionError);
            }

            res.status(200).json({
                message: 'Logout successful'
            });
        });
    });
});

module.exports = router;