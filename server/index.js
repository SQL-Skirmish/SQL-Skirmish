const express = require("express"),
  PORT = 3001,
  app = express();

app.get("/api/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
