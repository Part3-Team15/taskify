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

export type ModalProps =
  | ColumnModifyModalProps
  | ColumnDeleteModalProps
  | NewColumnModalProps
  | InviteMemberModalProps
  | null;

export interface ModalState {
  type: string | null;
  modalProps?: ModalProps;
}
