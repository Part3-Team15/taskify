import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  type: string | null;
  props?: string | null;
}

interface RootState {
  modal: ModalState;
}

const initialState: ModalState = {
  type: null,
  props: null,
};

export const modalSelector = (state: RootState) => state.modal;

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: string | null; props: string | null }>) => {
      const { type, props = null } = action.payload;
      state.type = type;
      state.props = props;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
