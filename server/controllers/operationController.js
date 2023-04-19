const db = require("../models/promptModel");
const operationController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `operationController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in operationController.${method}. Check server logs for more details.`,
    },
  };
};

operationController.executeOperation = async (req, res, next) => {
  try {
    const { operation } = req.body;
    console.log("operation: ", operation);
    const response = await db.query(operation);
    console.log("response: ", response);
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
