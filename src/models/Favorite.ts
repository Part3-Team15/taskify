import mongoose, { Document, Schema, model, Model } from 'mongoose';

interface FavoriteDashboard extends Document {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

const FavoriteSchema: Schema<FavoriteDashboard> = new Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  createdByMe: {
    type: Boolean,
    required: true,
  },
});

const FavoriteModel: Model<FavoriteDashboard> =
  mongoose.models.FavoriteDashboard || model<FavoriteDashboard>('FavoriteDashboard', FavoriteSchema);

export default FavoriteModel;
