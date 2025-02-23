export type IIncident = {
  id: number;
  name: string;
  surname: string;
  status: IIncidentStatus;
  date: Date | { start: Date; end: Date }; // Дата или период
};

export enum IIncidentStatus {
  REMOTE = "remote",
  SICK = "sick",
  VACATION = "vacation",
  STUDY = "study",
  OTHER = "other",
}
