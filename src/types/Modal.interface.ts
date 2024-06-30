export interface ModalState {
  type: string | null;
  modalProps: ModalProps;
}

export interface ModalActionState {
  type?: string;
  modalProps?: ModalProps;
}

export interface ModalProps {}

export interface NotificationModalProps extends ModalProps {
  text: string;
  onClick?: () => void;
}

export interface ConfirmModalProps extends ModalProps {
  text: string;
  onActionClick: () => void;
}

export interface ColumnModifyModalProps {
  columnTitle: string;
  columnId: number;
}

export interface NewColumnModalProps {
  dashboardId: number;
}

export interface InviteMemberModalProps {
  dashboardId: number;
}
