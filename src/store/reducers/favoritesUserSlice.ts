import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: number | null;
  _id: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userId: null,
  _id: null,
  loading: false,
  error: null,
};

const favoritesUserSlice = createSlice({
  name: 'favoritesUser',
  initialState,
  reducers: {
    setFavoritesUser: (state, action: PayloadAction<{ userId: number; _id: string }>) => {
      state.userId = action.payload.userId;
      state._id = action.payload._id;
    },
    clearFavoritesUser: (state) => {
      state.userId = null;
      state._id = null;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFavoritesUser, clearFavoritesUser, isLoading, setError } = favoritesUserSlice.actions;

export default favoritesUserSlice.reducer;
