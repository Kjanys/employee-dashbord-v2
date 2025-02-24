import { IPeriod } from "../types/system/i-period";

// Определение текста для кнопки выбора периода
export const getPeriodButtonText = (selectedPeriod: IPeriod) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() + (6 - today.getDay()))
  );
  const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  if (
    selectedPeriod.start.toDateString() === new Date().toDateString() &&
    selectedPeriod.end.toDateString() === new Date().toDateString()
  ) {
    return "Текущий день";
  } else if (
    selectedPeriod.start.toDateString() === startOfWeek.toDateString() &&
    selectedPeriod.end.toDateString() === endOfWeek.toDateString()
  ) {
    return "Текущая неделя";
  } else if (
    selectedPeriod.start.toDateString() === startOfMonth.toDateString() &&
    selectedPeriod.end.toDateString() === endOfMonth.toDateString()
  ) {
    return "Текущий месяц";
  } else if (
    selectedPeriod.start.toDateString() === startOfYear.toDateString() &&
    selectedPeriod.end.toDateString() === endOfYear.toDateString()
  ) {
    return "Текущий год";
  } else if (
    selectedPeriod.start.getTime() === new Date(0).getTime() &&
    selectedPeriod.end.toDateString() === endOfYear.toDateString()
  ) {
    return "Все";
  } else {
    return "Произвольный период";
  }
};
