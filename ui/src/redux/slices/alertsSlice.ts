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

export const initialState: AlertsState = {};

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
        if (existingAlertIndex === -1) {
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
