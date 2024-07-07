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
        console.log('POST /api/users 호출됨 ', req.body);
        const createUser = await User.create(req.body);
        res.status(201).json(createUser);
      } catch (error) {
        console.error('Failed to create user:', error);
        res.status(400).json({ error: 'Failed to create task', message: error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
