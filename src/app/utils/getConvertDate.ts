import { IIncident } from "../types/common/i-incident";

export const getConvertDate = (incident: IIncident) => ({
  ...incident,
  date: incident.isPeriod ? null : new Date(incident.date!),
  startDate: incident.isPeriod ? new Date(incident.startDate!) : null,
  endDate: incident.isPeriod ? new Date(incident.endDate!) : null,
});
