import express from 'express';

import createRouter from './router';
import createApiRouter from './api/router';

const PORT = 8000;

const app = express();

createRouter(app);
createApiRouter(app);

app.listen(PORT);