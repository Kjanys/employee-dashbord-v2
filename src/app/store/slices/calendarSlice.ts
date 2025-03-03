/* eslint-disable @typescript-eslint/no-explicit-any */
import { CALEDAR_STOK_VALUE } from "@/app/consts/calendar";
import { toaster } from "@/app/providers";
import { getConvertDate } from "@/app/utils/getConvertDate";
import { getCurentPeriod } from "@/app/utils/getCurentPeriod";
import { isIncidentInPeriod } from "@/app/utils/getIsIncidentInPeriod";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIncident } from "../../types/common/i-incident";

export type CurrentDate = {
  month: number;
  year: number;
};

interface CalendarState {
  currentMonthIncidents: IIncident[]; // Сотрудники, отображаемые на календаре за текущий месяц
  currentDate: CurrentDate;
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  currentMonthIncidents: [],
  currentDate: CALEDAR_STOK_VALUE,
  loading: false,
  error: null,
};

// Асинхронное действие для забора данных
export const fetchIncidents = createAsyncThunk(
  "calendar/fetchIncidents",
  async ({ month, year }: CurrentDate, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/incidents/all?month=${month}&year=${year}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при загрузке событий");
      }

      const data = await response.json();

      const incidents = data.map((incident: IIncident) =>
        getConvertDate(incident)
      );
      return incidents;
    } catch (error) {
      toaster.add({
        title: "Ошбка получения записей",
        name: "getAllError",
        theme: "danger",
        isClosable: true,
        content: error.message,
      });
      return rejectWithValue(error.message);
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Изменяем текущий месяц
    setCurrentDate(state, action: PayloadAction<CurrentDate>) {
      state.currentDate = action.payload;
      state.loading = true;
      state.error = null;
    },
    setCurrentMonthIncidents(state, action: PayloadAction<IIncident[]>) {
      state.currentMonthIncidents = action.payload;
    },
    setAddIncidents(state, action: PayloadAction<IIncident>) {
      console.log("NEW INCIDENT", action.payload);
      if (
        !isIncidentInPeriod(action.payload, getCurentPeriod(state.currentDate))
      )
        return;
      console.log("AAAAA");
      state.currentMonthIncidents = [
        ...state.currentMonthIncidents,
        action.payload,
      ];
    },
    setUpdateIncidents(state, action: PayloadAction<IIncident>) {
      if (
        !isIncidentInPeriod(action.payload, getCurentPeriod(state.currentDate))
      )
        return;

      const filtredIncidents = state.currentMonthIncidents.filter(
        (item) => item.id !== action.payload.id
      );
      state.currentMonthIncidents = [...filtredIncidents, action.payload];
    },
    setDeleteIncidents(state, action: PayloadAction<number>) {
      const incident = state.currentMonthIncidents.find(
        (item) => item.id === action.payload
      );

      if (
        !incident ||
        !isIncidentInPeriod(incident, getCurentPeriod(state.currentDate))
      )
        return;

      state.currentMonthIncidents = [
        ...state.currentMonthIncidents.filter(
          (item) => item.id !== action.payload
        ),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMonthIncidents = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentDate,
  setCurrentMonthIncidents,
  setAddIncidents,
  setUpdateIncidents,
  setDeleteIncidents,
} = calendarSlice.actions;

export default calendarSlice.reducer;
