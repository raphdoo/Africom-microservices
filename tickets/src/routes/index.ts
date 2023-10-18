import express, { Request, Response } from 'express';
import { Ticket } from '../models/tickets';
import { NotFoundError } from '@shared-serve/shared';

const router = express.Router();

router.get('/api/tickets', async (req, res) => {
  const ticket = await Ticket.find({
    orderId: undefined,
  });

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as indexTicketRouter };
