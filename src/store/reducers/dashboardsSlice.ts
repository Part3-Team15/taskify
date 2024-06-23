import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Dashboard } from '@/types/Dashboard.interface';

interface DashboardsState {
  dashboards: Dashboard[];
  totalCount: number;
}

const initialState: DashboardsState = {
  dashboards: [],
  totalCount: 0,
};

const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    setDashboards(state, action: PayloadAction<{ dashboards: Dashboard[]; totalCount: number }>) {
      state.dashboards = action.payload.dashboards;
      state.totalCount = action.payload.totalCount;
    },
  },
});

export const { setDashboards } = dashboardsSlice.actions;

export default dashboardsSlice.reducer;
