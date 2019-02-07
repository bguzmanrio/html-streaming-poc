import express from 'express';
import path from 'path';

// we'll talk about this in a minute:
import serverRenderer from './middleware/renderer';
import streamRender from './middleware/streamer';


export default app => {  
  const router = express.Router();

  router.use('/app', serverRenderer);
  
  router.use('/stream', streamRender);

  router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
  ));
  
  app.use(router);
}