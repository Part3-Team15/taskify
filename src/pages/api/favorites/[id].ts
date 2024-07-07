import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/dbConnect';
import Favorite from '@/models/Favorite';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query; // 이 id는 user의 MongoDB ObjectId입니다.

  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  switch (req.method) {
    case 'GET':
      try {
        console.log('GET /api/favorites/[id]', id, '호출됨');

        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const favorites = await Favorite.find({ userId: user.userId });
        console.log('조회된 즐겨찾기 항목:', favorites);

        if (!favorites.length) {
          console.log('즐겨찾기 항목이 없습니다.');
          return res.status(404).json({ error: 'Favorites not found' });
        }
        res.status(200).json(favorites);
      } catch (error) {
        console.error('즐겨찾기 항목 조회 실패:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
      }
      break;

    case 'POST':
      try {
        const { id: favoriteId, title, color, createdAt, updatedAt, createdByMe, userId } = req.body;

        console.log('POST 요청 본문:', req.body); // 디버깅 로그 추가

        if (!favoriteId || !title || !color || !createdAt || !updatedAt || createdByMe === undefined || !userId) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        if (user.userId !== userId) {
          return res.status(400).json({ error: 'User ID does not match' });
        }

        const newFavorite = new Favorite({
          id: favoriteId,
          userId: user.userId,
          title,
          color,
          createdAt,
          updatedAt,
          createdByMe,
        });
        await newFavorite.save();
        res.status(201).json(newFavorite);
      } catch (error) {
        console.error('즐겨찾기 항목 생성 실패:', error);
        res.status(400).json({ error: 'Failed to create favorite' });
      }
      break;

    case 'DELETE':
      try {
        const { favoriteId } = req.body;

        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const favorite = await Favorite.findOneAndDelete({ _id: favoriteId, userId: user.userId });
        if (!favorite) {
          return res.status(404).json({ error: 'Favorite not found' });
        }
        res.status(204).end();
      } catch (error) {
        console.error('즐겨찾기 항목 삭제 실패:', error);
        res.status(500).json({ error: 'Failed to delete favorite' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
