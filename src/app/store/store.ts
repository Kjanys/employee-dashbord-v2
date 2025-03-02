import { configureStore } from "@reduxjs/toolkit";
import { EmployeeApi } from "./api/api-employee";
import { IncidentsApi } from "./api/api-incidents";
import calendarSlice from "./slices/calendarSlice";
import themeSlice from "./slices/themeSlice";
import userJournalSlice from "./slices/userJournalSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [EmployeeApi.reducerPath]: EmployeeApi.reducer,
    [IncidentsApi.reducerPath]: IncidentsApi.reducer,
    calendar: calendarSlice,
    user: userSlice,
    theme: themeSlice,
    userJournal: userJournalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(EmployeeApi.middleware)
      .concat(IncidentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
