export type IIncident = {
  id: number;
  userId: number;
  name: string;
  surname: string;
  status: IIncidentStatus;
  date: Date | null;
  isPeriod: boolean;
  startDate: Date | null;
  endDate: Date | null;
};

export enum IIncidentStatus {
  REMOTE = "REMOTE",
  SICK = "SICK",
  VACATION = "VACATION",
  STUDY = "STUDY",
  OTHER = "OTHER",
}
