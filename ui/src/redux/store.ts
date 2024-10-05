import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
// ... other imports

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    // ... other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
