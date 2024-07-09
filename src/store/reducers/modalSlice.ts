import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalState } from '@/types/Modal.interface';

interface RootState {
  modal: ModalState;
}

const initialState: ModalState = {
  type: null,
  modalProps: {},
};

export const modalSelector = (state: RootState) => state.modal;

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      const { type, modalProps } = action.payload;
      state.type = type;
      state.modalProps = modalProps;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
