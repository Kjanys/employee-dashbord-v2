import { IPeriod } from "../system/i-period";

export type IIncident = {
  id: number;
  userId: number;
  name: string;
  surname: string;
  status: IIncidentStatus;
  date: Date | IPeriod; // Дата или период
};

export enum IIncidentStatus {
  REMOTE = "REMOTE",
  SICK = "SICK",
  VACATION = "VACATION",
  STUDY = "STUDY",
  OTHER = "OTHER",
}
