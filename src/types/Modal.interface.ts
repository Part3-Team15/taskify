export interface ColumnModifyModalProps {
  columnTitle: string;
  columnId: number;
}
export interface ColumnDeleteModalProps {
  columnId: number;
}

export interface NewColumnModalProps {
  dashboardId: number;
}

export interface InviteMemberModalProps {
  dashboardId: number;
}

export interface DeleteDashboardModalProps {
  dashboardId: number;
}

export interface TextModalProps {
  text: string;
}

export interface EmailExistModalProps {
  onResetField: () => void;
  onSetFocus: () => void;
}

export type ModalProps =
  | ColumnModifyModalProps
  | ColumnDeleteModalProps
  | NewColumnModalProps
  | InviteMemberModalProps
  | DeleteDashboardModalProps
  | EmailExistModalProps
  | TextModalProps
  | null;

export interface ModalState {
  type: string | null;
  modalProps?: ModalProps;
}
