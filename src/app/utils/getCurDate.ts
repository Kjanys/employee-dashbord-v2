import { CurrentDate } from "../store/slices/calendarSlice";

const FIRST_MONTH_INDEX = 0; // Январь
const LAST_MONTH_INDEX = 11; // Декабрь

export const getCurDate = (
  currentDate: CurrentDate,
  isPrev: boolean
): CurrentDate => {
  const { month, year } = currentDate;
  const term = isPrev ? -1 : 1;

  // Определяем, нужно ли переключать год
  const isSwitchingYearForward = month === LAST_MONTH_INDEX && !isPrev;
  const isSwitchingYearBackward = month === FIRST_MONTH_INDEX && isPrev;

  // Вычисляем новый месяц и год
  const newMonth = isSwitchingYearForward
    ? FIRST_MONTH_INDEX
    : isSwitchingYearBackward
    ? LAST_MONTH_INDEX
    : month + term;

  const newYear = isSwitchingYearForward
    ? year + 1
    : isSwitchingYearBackward
    ? year - 1
    : year;

  return {
    year: newYear,
    month: newMonth,
  };
};
