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
    updateIncident(state, action: PayloadAction<IIncident>) {
      const index = state.incidents.findIndex(
        (incident) => incident.id === action.payload.id
      );
      if (index !== -1) {
        state.incidents[index] = action.payload;
      }
    },
    setIncidents(state, action: PayloadAction<IIncident[]>) {
      state.incidents = action.payload;
    },
  },
});

export const { updateIncident, setIncidents } = userJournalSlice.actions;

export default userJournalSlice.reducer;
