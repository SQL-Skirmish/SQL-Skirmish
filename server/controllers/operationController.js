const db = require("../models/promptModel");
const operationController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `promptController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

operationController.executeOperation = async (req, res, next) => {
  try {
    const { operation } = req.body;
    const response = await db.query(operation);
    res.locals.response = response.rows;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: "executeOperation",
        type: "errorInCatch",
        err,
      })
    );
  }
};

module.exports = operationController;
