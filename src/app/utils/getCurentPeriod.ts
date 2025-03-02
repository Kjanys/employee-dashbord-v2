import { CurrentDate } from "../store/slices/calendarSlice";

export const getCurentPeriod = (currentDate: CurrentDate) => ({
  start: new Date(currentDate.year, currentDate.month, 1),
  end: new Date(currentDate.year, currentDate.month + 1, 0),
});
