import { IIncident, IIncidentStatus, PeriodName } from "../common/i-incident";

export type IIncidentPayload = { massage: string; incident: IIncident };

export type IIncidentDeletePayload = { massage: string; id: number };

export type IIncidentJournalPaylod = {
  userId: number;
  periodName: PeriodName;
  startDate: Date | null;
  endDate: Date | null;
  statuses: IIncidentStatus[];
};
