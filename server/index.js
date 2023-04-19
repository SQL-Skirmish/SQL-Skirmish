const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const passport = require('./auth/passport');
const routes = require('./routes/auth');

const app = express();
const PORT = 3001;

// Passport middleware
app.use(passport.initialize());

// Routes middleware
app.use('/auth', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));