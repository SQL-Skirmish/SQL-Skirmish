const express = require("express");
const router = express.Router();

const operationController = require("../controllers/operationController");

router.post("/", operationController.executeOperation, (req, res) =>
  res.status(200).json(res.locals)
);

module.exports = router;
