import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalState, ModalActionState } from '@/types/Modal.interface';

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
    /* NOTE: openModal을 사용할 때는 type, modalProps를 선택적으로 주도록 했고,
     * 값을 주지 않는 경우 기본값으로 initialState와 같은 값을 주도록 했습니다.
     * 실수로 값을 주지 못하는 경우를 방지하려면 모두 필수로 주도록 변경하고, 빈값이라도 항상 넘기도록 변경해야합니다.
     */
    openModal: (state, action: PayloadAction<ModalActionState>) => {
      const { type, modalProps } = action.payload;
      state.type = type || null;
      state.modalProps = modalProps || {};
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
