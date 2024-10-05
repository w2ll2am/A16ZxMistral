import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
}

export const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
