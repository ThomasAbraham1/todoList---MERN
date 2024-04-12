const { Router } = require('express');
const { crudRouter } = require('./controllers');

const apiRouter = Router();


apiRouter.use('/api', crudRouter);

module.exports = {
    apiRouter,
  };