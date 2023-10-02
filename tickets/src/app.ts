import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// Handling async errors
import 'express-async-errors';

// Import routes
import { createTicketRouter } from './routes/new';

import { errorHandler, NotFoundError, currentUser } from '@shared-serve/shared';
import { getTicketRouter } from './routes/getTicket';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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
app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// handling other routes
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
