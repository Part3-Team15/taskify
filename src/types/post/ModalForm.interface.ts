export interface NewDashboardForm {
  title: string;
  color: string;
}

export interface NewColumnForm {
  title: string;
  dashboardId: number;
}

export interface InviteMemberForm {
  email: string;
}
