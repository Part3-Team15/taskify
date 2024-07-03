import { Card } from './Card.interface';
import { Column } from './Column.interface';

export interface ModalState {
  type: ModalType | null;
  modalProps: ModalProps;
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

export interface NewColumnModalProps extends ModalProps {
  columns: Column[];
}

export interface ModifyColumnModalProps extends ModalProps {
  columns: Column[];
  columnTitle: string;
  columnId: number;
}

export interface TodoCardModalProps extends ModalProps {
  card: Card;
  column: Column;
  onClick?: () => void;
}

export const MODAL = {
  NOTIFICATION: 'notification',
  CONFIRM: 'confirm',
  NEW_DASHBOARD: 'newDashboard',
  NEW_COLUMN: 'newColumn',
  INVITE_MEMBER: 'inviteMember',
  MODIFY_COLUMN: 'modifyColumn',
  TODO_CARD: 'todoCard',
} as const;

export type ModalType = (typeof MODAL)[keyof typeof MODAL];
