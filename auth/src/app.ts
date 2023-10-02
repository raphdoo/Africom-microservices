import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// Handling async errors
import 'express-async-errors';

// Import routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@shared-serve/shared';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// handling other routes
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
