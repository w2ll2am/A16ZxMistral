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

const initialState: AlertsState = {
  1: [],
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
        const existingAlertIndex = state[alert.stream_id].findIndex(
          (a) => a.type === alert.type
        );
        if (existingAlertIndex === -1) {
          // Add new alert
          state[alert.stream_id].push(alert);
        } else {
          // Update existing alert
          state[alert.stream_id][existingAlertIndex] = alert;
        }
      });
    },
  },
});

export const { addAlerts } = alertsSlice.actions;

// Selector to get alerts by stream ID
export const selectAlertsByStreamId = (state: RootState, streamId: number) =>
  state.alerts[streamId] || [];

// Selector to get sorted alerts from all streams
export const selectSortedAlerts = (state: RootState): Alert[] => {
  const allAlerts = Object.values(state.alerts).filter(Array.isArray).flat();

  if (allAlerts.length === 0) {
    return [];
  }

  return allAlerts.sort((a, b) => b.timestamp - a.timestamp);
};

export default alertsSlice.reducer;
