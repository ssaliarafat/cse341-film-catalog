const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const users = mongodb.getDb().collection('users');

                const userData = {
                    githubId: profile.id,
                    displayName: profile.displayName || profile.username,
                    username: profile.username || '',
                    email:
                        profile.emails && profile.emails.length > 0
                            ? profile.emails[0].value
                            : '',
                    profileUrl: profile.profileUrl || '',
                    lastLogin: new Date()
                };

                await users.updateOne(
                    { githubId: profile.id },
                    {
                        $set: userData,
                        $setOnInsert: {
                            createdAt: new Date()
                        }
                    },
                    { upsert: true }
                );

                const user = await users.findOne({
                    githubId: profile.id
                });

                done(null, user);
            } catch (error) {
                console.error('GitHub authentication error:', error);
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await mongodb
            .getDb()
            .collection('users')
            .findOne({ _id: new ObjectId(id) });

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;