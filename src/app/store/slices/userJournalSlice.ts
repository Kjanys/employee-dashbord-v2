import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIncident } from "../../types/common/i-incident";

interface UserJournalState {
  incidents: IIncident[];
}

const initialState: UserJournalState = {
  incidents: [],
};

const userJournalSlice = createSlice({
  name: "userJournal",
  initialState,
  reducers: {
    setIncidents(state, action: PayloadAction<IIncident[]>) {
      state.incidents = action.payload;
    },
  },
});

export const { setIncidents } = userJournalSlice.actions;

export default userJournalSlice.reducer;
