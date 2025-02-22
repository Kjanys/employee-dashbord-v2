import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../../types/common/i-employee";

interface CalendarState {
  currentMonthEmployees: IEmployee[]; // Сотрудники, отображаемые на календаре за текущий месяц
  currentMonth: number; // Текущий месяц (0-11, где 0 — январь)
  currentYear: number; // Текущий год
}

const initialState: CalendarState = {
  currentMonthEmployees: [],
  currentMonth: new Date().getMonth(), // Текущий месяц по умолчанию
  currentYear: new Date().getFullYear(), // Текущий год по умолчанию
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Устанавливаем сотрудников для текущего месяца
    setCurrentMonthEmployees(state, action: PayloadAction<IEmployee[]>) {
      state.currentMonthEmployees = action.payload;
    },
    // Изменяем текущий месяц
    setCurrentMonth(state, action: PayloadAction<number>) {
      state.currentMonth = action.payload;
    },
    // Изменяем текущий год
    setCurrentYear(state, action: PayloadAction<number>) {
      state.currentYear = action.payload;
    },
  },
});

export const { setCurrentMonthEmployees, setCurrentMonth, setCurrentYear } =
  calendarSlice.actions;

export default calendarSlice.reducer;
