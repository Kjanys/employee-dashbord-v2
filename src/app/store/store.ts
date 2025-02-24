import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./slices/calendarSlice";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";
import userJournalSlice from "./slices/userJournalSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    user: userSlice,
    theme: themeSlice,
    userJournal: userJournalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
