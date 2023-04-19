// require ('dotenv').config();
const express = require('express');
const passport = require('../auth/passport');
const router = express.Router();


// GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// Discord Authentication
router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;