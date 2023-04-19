const express = require("express"),
  PORT = 3001,
  app = express();
const promptRouter = require('./routes/promptRouter');

app.get("/api/", (req, res) => {
  res.send("hi");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/prompt', promptRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));

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