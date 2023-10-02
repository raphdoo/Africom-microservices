import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// Handling async errors
import 'express-async-errors';

// Import routes
import { indexOrderRouter } from './routes';
import { createOrderRouter } from './routes/new';
import { CancelOrderRouter } from './routes/cancel';
import { showOrderRouter } from './routes/show';

import { errorHandler, NotFoundError, currentUser } from '@shared-serve/shared';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

//Authorization Middleware
app.use(currentUser);

// Routes
app.use(CancelOrderRouter);
app.use(indexOrderRouter);
app.use(createOrderRouter);
app.use(showOrderRouter);

// handling other routes
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
