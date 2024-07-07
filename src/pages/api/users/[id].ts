import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/dbConnect';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ error: 'Task ID is required' });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
          return res.status(404).json({ error: 'Task not found' });
        }

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
      }
      break;

    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
