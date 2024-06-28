export interface NewDashboardFormData {
  title: string;
  color: string;
}

export interface NewColumnFormData {
  title: string;
  dashboardId: number;
}

export interface MemberInviteFormData {
  email: string;
}
