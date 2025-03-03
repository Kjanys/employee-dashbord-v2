import { IIncident } from "../types/common/i-incident";

// Вспомогательная функция для проверки, попадает ли сотрудник в текущий день
export const isEmployeeInDay = (
  incident: IIncident,
  day: number,
  month: number,
  year: number
): boolean => {
  const currentDate = new Date(year, month, day);
  if (!incident.isPeriod) {
    // Если дата — один день
    return (
      new Date(incident.date!).getDate() === currentDate.getDate() &&
      new Date(incident.date!).getMonth() === currentDate.getMonth() &&
      new Date(incident.date!).getFullYear() === currentDate.getFullYear()
    );
  } else {
    // Если дата — период
    const startDate = new Date(
      new Date(incident.startDate!).setHours(0, 0, 0, 0)
    );
    const endDate = new Date(
      new Date(incident.endDate!).setHours(23, 59, 59, 59)
    );
    return currentDate >= startDate && currentDate <= endDate;
  }
};
