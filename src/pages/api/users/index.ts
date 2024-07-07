import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/dbConnect';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const getUser = await User.find();
        res.status(200).json(getUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      break;

    case 'POST':
      try {
        const createUser = await User.create(req.body);
        res.status(201).json(createUser);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create task' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
