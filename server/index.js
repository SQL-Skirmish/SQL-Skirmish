const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const passport = require('./auth/passport');
const routes = require('./routes/auth');

const app = express();
const PORT = 3001;
const promptRouter = require('./routes/promptRouter');

// Passport middleware
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/prompt', promptRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// Routes middleware
app.use('/auth', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//Express Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;