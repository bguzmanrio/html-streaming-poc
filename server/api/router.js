import express from 'express';

const data = {
  items: [
    {
      id: 1,
      todo: 'List things'
    },
    {
      id: 2,
      todo: 'List things again'
    },
    {
      id: 3,
      todo: 'List all things'
    },
    {
      id: 4,
      todo: 'List things all the time'
    },
    {
      id: 5,
      todo: 'List even more things'
    },
    {
      id: 6,
      todo: 'List only some things'
    },
  ]
}

const createApiRouter = app => {
  const router = express.Router();

  router.use('/data', (req, res) => {
    res.json(data);
  });

  app.use('/api', router);
}

export default createApiRouter;