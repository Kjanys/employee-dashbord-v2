import { IIncident } from "../types/common/i-incident";
import { IPeriod } from "../types/system/i-period";

// Функция для проверки, входит ли событие в выбранный период
export const isIncidentInPeriod = (
  incident: IIncident,
  selectedPeriod: IPeriod
): boolean => {
  const { startDate, endDate } = selectedPeriod;

  const incidentStart = !incident.isPeriod
    ? new Date(incident.date!)
    : new Date(incident.startDate!);
  const incidentEnd = !incident.isPeriod
    ? new Date(incident.date!)
    : new Date(incident.endDate!);
  console.log("incident", incident);
  console.log("incidentStart", incidentStart);
  console.log("incidentEnd", incidentEnd);
  console.log("selectedPeriod", selectedPeriod);
  return (
    (incidentStart! >= startDate && incidentStart! <= endDate) || // Начало события в периоде
    (incidentEnd! >= startDate && incidentEnd! <= endDate) || // Конец события в периоде
    (incidentStart! <= startDate && incidentEnd! >= endDate) // Событие охватывает период
  );
};
