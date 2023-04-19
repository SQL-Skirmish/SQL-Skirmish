const db = require('../models/promptModel');

const promptController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `promptController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
};

// Get one prompt from database
promptController.getOnePrompt = async (req, res, next) => {
  try {
    const getNumber = await db.query(`SELECT COUNT(_id) FROM public.prompts;`);
    const number = Number(getNumber.rows[0].count);
    const randomized = Math.ceil(Math.random() * number);
    const getPrompt = await db.query(`SELECT prompt, answer FROM public.prompts 
    WHERE _id=$1;`, [randomized]);
    console.log('getPrompt is', getPrompt.rows[0]);
    res.locals.prompt = getPrompt.rows[0].prompt;
    res.locals.answer = getPrompt.rows[0].answer;
    return next();
  } catch (err) {
    return next(createErr({
      method: 'getOne',
      type: 'errorInCatch',
      err
    }));
  }
};

// Get inputted query from user and return result of that prompt
promptController.checkPrompt = async (req, res, next) => {
  try {
    const { test } = req.body;
    const response = await db.query(test);
    res.locals.response = response.rows[0];
    return next();
  } catch (err) {
    return next(createErr({
      method: 'checkPrompt',
      type: 'errorInCatch',
      err
    }))
  }
}

module.exports = promptController;