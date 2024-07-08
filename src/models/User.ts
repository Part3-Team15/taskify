import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  userId: number;
}

const UserSchema: Schema<IUser> = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
