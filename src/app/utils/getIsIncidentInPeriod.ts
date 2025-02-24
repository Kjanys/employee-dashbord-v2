import { IIncident } from "../types/common/i-incident";
import { IPeriod } from "../types/system/i-period";

// Функция для проверки, входит ли событие в выбранный период
export const isIncidentInPeriod = (
  incident: IIncident,
  selectedPeriod: IPeriod
): boolean => {
  const { start, end } = selectedPeriod;

  const incidentStart =
    incident.date instanceof Date ? incident.date : incident.date.start;
  const incidentEnd =
    incident.date instanceof Date ? incident.date : incident.date.end;

  return (
    (incidentStart >= start && incidentStart <= end) || // Начало события в периоде
    (incidentEnd >= start && incidentEnd <= end) || // Конец события в периоде
    (incidentStart <= start && incidentEnd >= end) // Событие охватывает период
  );
};
