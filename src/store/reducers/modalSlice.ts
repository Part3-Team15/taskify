import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalState, ModalProps } from '@/types/Modal.interface';

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
    openModal: (state, action: PayloadAction<{ type: string | null; props: ModalProps }>) => {
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
