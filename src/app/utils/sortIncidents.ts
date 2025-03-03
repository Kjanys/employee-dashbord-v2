import { IIncident } from "../types/common/i-incident";

export const sortIncidents = (incidents: IIncident[], sortDesc: boolean) => {
  if (!incidents.length) return [];

  return incidents.slice().sort((a, b) => {
    const dateA = !a.isPeriod ? new Date(a.date!) : new Date(a.startDate!);
    const dateB = !b.isPeriod ? new Date(b.date!) : new Date(b.startDate!);

    // Сравниваем даты
    if (sortDesc) {
      // Сортировка по убыванию
      return dateB.getTime() - dateA.getTime();
    } else {
      // Сортировка по возрастанию
      return dateA.getTime() - dateB.getTime();
    }
  });
};
