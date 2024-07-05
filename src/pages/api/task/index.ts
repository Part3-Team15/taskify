import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/dbConnect';
import Taskify from '@/db/models/taskify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const getFavoriteTask = await Taskify.find();
        res.status(200).json(getFavoriteTask);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      break;

    case 'POST':
      try {
        const favoriteTask = await Taskify.create(req.body);
        res.status(201).json(favoriteTask);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create task' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
