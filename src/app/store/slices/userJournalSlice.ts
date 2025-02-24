import { mockJournal } from "@/app/data/mockJournal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIncident } from "../../types/common/i-incident";

interface UserJournalState {
  incidents: IIncident[];
}

const initialState: UserJournalState = {
  incidents: mockJournal,
};

const userJournalSlice = createSlice({
  name: "userJournal",
  initialState,
  reducers: {
    addIncident(state, action: PayloadAction<IIncident>) {
      state.incidents.push(action.payload);
    },
    updateIncident(state, action: PayloadAction<IIncident>) {
      const index = state.incidents.findIndex(
        (incident) => incident.id === action.payload.id
      );
      if (index !== -1) {
        state.incidents[index] = action.payload;
      }
    },
    deleteIncident(state, action: PayloadAction<number>) {
      state.incidents = state.incidents.filter(
        (incident) => incident.id !== action.payload
      );
    },
  },
});

export const { addIncident, updateIncident, deleteIncident } =
  userJournalSlice.actions;

export default userJournalSlice.reducer;
