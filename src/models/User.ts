import mongoose, { Schema, Model, Document } from 'mongoose';

interface User extends Document {
  userId: number;
}

const UserSchema: Schema<User> = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
});

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
