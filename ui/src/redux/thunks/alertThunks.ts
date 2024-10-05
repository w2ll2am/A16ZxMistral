// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState, AppDispatch } from "../store";
// import { addMessage } from "../slices/chatSlice";

// export const fetchAlertDetails = createAsyncThunk<
//   void,
//   string,
//   { dispatch: AppDispatch; state: RootState }
// >(
//   "alerts/fetchAlertDetails",
//   async (alertId: string, { getState, dispatch, extra }) => {
//     const state = getState();
//     const alert = state.alerts.alerts.find((a) => a.alertId === alertId);
//     const { sendMessageAndAwaitResponse } = extra as {
//       sendMessageAndAwaitResponse: (
//         text: string
//       ) => Promise<{ text: string; isUser: boolean }>;
//     };

//     if (!alert) {
//       throw new Error("Alert not found");
//     }

//     // Step 1: Initially give the basic description
//     dispatch(
//       addMessage({
//         text: `New alert detected:
// Alert ID: ${alertId}
// Description: ${alert.description}
// Camera: ${alert.cameraNumber}
// Severity: ${alert.severity}
// Time: ${alert.timestamp}

// Requesting more information from the backend...`,
//         isUser: false,
//       })
//     );

//     // Step 2: Show waiting indicator
//     let dotsCount = 0;
//     const interval = setInterval(() => {
//       dispatch(
//         addMessage({
//           text: ".".repeat(dotsCount + 1),
//           isUser: false,
//         })
//       );
//       dotsCount = (dotsCount + 1) % 3;
//     }, 2000);

//     try {
//       // Step 3: Send message to backend and await response
//       const response = await sendMessageAndAwaitResponse(
//         `Query: tell me more about ${alertId}
//         Description: ${alert.description}
//         Camera: ${alert.cameraNumber}
//         Severity: ${alert.severity}
//         Time: ${alert.timestamp}`
//       );

//       clearInterval(interval);

//       // Step 4: Display the response from the backend
//       dispatch(addMessage(response));
//     } catch (error) {
//       clearInterval(interval);
//       dispatch(
//         addMessage({
//           text: `Error fetching alert details: ${error.message}`,
//           isUser: false,
//         })
//       );
//     }
//   }
// );
