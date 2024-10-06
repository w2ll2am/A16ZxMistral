import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Alert {
  type: string;
  stream_id: number;
  long: number;
  lat: number;
  timestamp: number;
  ttl: number;
}

export interface AlertsState {
  [streamId: number]: Alert[];
}

export const initialState: AlertsState = {};

const TTL_DURATION = 3000; // 3 seconds in milliseconds

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
          // Add new alert with TTL
          state[alert.stream_id].push({ ...alert, ttl: TTL_DURATION });
        } else {
          // Reset TTL for existing alert
          state[alert.stream_id][existingAlertIndex].ttl = TTL_DURATION;
        }
      });
    },
    decrementTTL: (state) => {
      Object.keys(state).forEach((streamId) => {
        state[Number(streamId)] = state[Number(streamId)]
          .map((alert) => ({ ...alert, ttl: alert.ttl - 100 }))
          .filter((alert) => alert.ttl > 0);
      });
    },
  },
});

export const { addAlerts, decrementTTL } = alertsSlice.actions;

export const selectAlertsByStreamId = (state: RootState, streamId: number) =>
  state.alerts[streamId];
// Selector to get sorted alerts from all streams
export const selectSortedAlerts = (state: RootState) => {
  const allAlerts = Object.values(state.alerts).flat();
  return allAlerts.sort((a, b) => b.timestamp - a.timestamp);
};
export default alertsSlice.reducer;
