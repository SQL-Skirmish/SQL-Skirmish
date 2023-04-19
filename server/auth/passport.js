// require ('dotenv').config();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOrCreate(profile);
      done(null, user);
    }
  )
);

// Discord Strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: '/auth/discord/callback',
      scope: ['identify', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOrCreate(profile);
      done(null, user);
    }
  )
);

module.exports = passport;
