import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import alertsReducer from "./slices/alertsSlice";
// ... other imports

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    chat: chatReducer,
    // ... other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
