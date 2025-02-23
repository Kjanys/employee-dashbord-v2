import { IIncident } from "../types/common/i-incident";

// Вспомогательная функция для проверки, попадает ли сотрудник в текущий день
export const isEmployeeInDay = (
  employee: IIncident,
  day: number,
  month: number,
  year: number
): boolean => {
  const currentDate = new Date(year, month, day);

  if (employee.date instanceof Date) {
    // Если дата — один день
    return (
      employee.date.getDate() === currentDate.getDate() &&
      employee.date.getMonth() === currentDate.getMonth() &&
      employee.date.getFullYear() === currentDate.getFullYear()
    );
  } else {
    // Если дата — период
    const startDate = new Date(employee.date.start);
    const endDate = new Date(employee.date.end);
    return currentDate >= startDate && currentDate <= endDate;
  }
};
