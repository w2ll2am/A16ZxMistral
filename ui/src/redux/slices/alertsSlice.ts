import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CLEAN_INTERVAL } from "../../utils/constants";
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

const initialState: AlertsState = {};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addOrUpdateAlerts: (state, action: PayloadAction<Alert[]>) => {
      action.payload.forEach((alert) => {
        if (!state[alert.stream_id]) {
          state[alert.stream_id] = [];
        }
        const existingAlertIndex = state[alert.stream_id].findIndex(
          (a) => a.type === alert.type
        );
        if (existingAlertIndex === -1) {
          // Add new alert
          state[alert.stream_id].push({
            ...alert,
            timestamp: Date.now(), // Use current timestamp
          });
        } else {
          // Update existing alert's timestamp
          state[alert.stream_id][existingAlertIndex].timestamp = Date.now();
        }
      });
    },
    cleanAlerts: (state) => {
      const currentTime = Date.now();
      const twentySecondsAgo = currentTime - CLEAN_INTERVAL; // 20 seconds in milliseconds
      Object.keys(state).forEach((streamId) => {
        state[Number(streamId)] = state[Number(streamId)].filter(
          (alert) => alert.timestamp > twentySecondsAgo
        );
      });
    },
  },
});

export const { addOrUpdateAlerts, cleanAlerts } = alertsSlice.actions;

// Selector to get alerts by stream ID
export const selectAlertsByStreamId = (state: RootState, streamId: number) =>
  state.alerts[streamId] || [];

// Selector to get sorted alerts from all streams
export const selectSortedAlerts = (state: RootState): Alert[] => {
  const allAlerts = Object.values(state.alerts).flat();
  return allAlerts.sort((a, b) => b.timestamp - a.timestamp);
};

export default alertsSlice.reducer;
