import { IPeriod } from "../types/system/i-period";

// Определение текста для кнопки выбора периода
export const getPeriodButtonText = (selectedPeriod: IPeriod) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(
    new Date().setDate(
      new Date().getDate() -
        new Date().getDay() +
        (new Date().getDay() === 0 ? -6 : 1)
    )
  );
  const endOfWeek = new Date(
    today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7))
  );

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  if (
    selectedPeriod.startDate.toDateString() === new Date().toDateString() &&
    selectedPeriod.endDate.toDateString() === new Date().toDateString()
  ) {
    return "Текущий день";
  } else if (
    selectedPeriod.startDate.toDateString() === startOfWeek.toDateString() &&
    selectedPeriod.endDate.toDateString() === endOfWeek.toDateString()
  ) {
    return "Текущая неделя";
  } else if (
    selectedPeriod.startDate.toDateString() === startOfMonth.toDateString() &&
    selectedPeriod.endDate.toDateString() === endOfMonth.toDateString()
  ) {
    return "Текущий месяц";
  } else if (
    selectedPeriod.startDate.toDateString() === startOfYear.toDateString() &&
    selectedPeriod.endDate.toDateString() === endOfYear.toDateString()
  ) {
    return "Текущий год";
  } else if (
    selectedPeriod.startDate.getTime() === new Date(0).getTime() &&
    selectedPeriod.endDate.toDateString() === endOfYear.toDateString()
  ) {
    return "Все";
  } else {
    return "Произвольный период";
  }
};
