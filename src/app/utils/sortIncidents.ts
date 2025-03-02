import { IIncident } from "../types/common/i-incident";

export const sortIncidents = (incidents: IIncident[], sortDesc: boolean) => {
  if (!incidents.length) return [];

  console.log("incidents", incidents);
  return incidents.sort((a, b) => {
    console.log("a", a);
    console.log("b", b);
    // Получаем дату для первого события
    const dateA = a.date instanceof Date ? a.date : a.date.start;
    // Получаем дату для второго события
    const dateB = b.date instanceof Date ? b.date : b.date.start;

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
