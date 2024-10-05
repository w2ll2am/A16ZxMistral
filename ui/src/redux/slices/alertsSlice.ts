import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Alert {
  type: string;
  stream_id: number;
  long: number;
  lat: number;
  timestamp: number;
}

export interface AlertsState {
  [streamId: number]: Alert[];
}

export const initialState: AlertsState = {
  1: [
    {
      type: "warning",
      stream_id: 1,
      long: -122.4194,
      lat: 37.7749,
      timestamp: 1633027200000, // 2021-10-01 00:00:00 UTC
    },
    {
      type: "error",
      stream_id: 1,
      long: -122.4194,
      lat: 37.7749,
      timestamp: 1633113600000, // 2021-10-02 00:00:00 UTC
    },
  ],
  2: [
    {
      type: "info",
      stream_id: 2,
      long: -74.006,
      lat: 40.7128,
      timestamp: 1633200000000, // 2021-10-03 00:00:00 UTC
    },
  ],
  3: [], // Empty stream for testing
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlerts: (state, action: PayloadAction<Alert[]>) => {
      action.payload.forEach((alert) => {
        if (!state[alert.stream_id]) {
          state[alert.stream_id] = [];
        }
        // Check if alert of this type already exists for this stream
        const existingAlertIndex = state[alert.stream_id].findIndex(
          (a) => a.type === alert.type
        );
        if (existingAlertIndex !== -1) {
          // Update existing alert
          state[alert.stream_id][existingAlertIndex] = alert;
        } else {
          // Add new alert
          state[alert.stream_id].push(alert);
        }
      });
    },
  },
});

export const { addAlerts } = alertsSlice.actions;

// Selector to get sorted alerts from all streams
export const selectSortedAlerts = (state: RootState) => {
  const allAlerts = Object.values(state.alerts).flat();
  return allAlerts.sort((a, b) => b.timestamp - a.timestamp);
};

export default alertsSlice.reducer;
