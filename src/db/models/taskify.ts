import mongoose from 'mongoose';

import { FavoriteDashboard } from './../../types/Dashboard.interface';

const favoriteTaskSchema = new mongoose.Schema<FavoriteDashboard>({
  id: {
    type: Number,
    default: 0,
    required: true,
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
  color: {
    type: String,
    default: '',
    required: true,
  },
  userId: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: String,
    default: '',
    required: true,
  },
  updatedAt: {
    type: String,
    default: '',
    required: true,
  },
  createdByMe: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.models.favorite || mongoose.model('favorite', favoriteTaskSchema);
