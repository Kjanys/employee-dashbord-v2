import { CurrentDate } from "../store/slices/calendarSlice";

export const getCurentPeriod = (currentDate: CurrentDate) => ({
  startDate: new Date(currentDate.year, currentDate.month, 1),
  endDate: new Date(currentDate.year, currentDate.month + 1, 0),
});
