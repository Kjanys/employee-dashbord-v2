export type IEmployee = {
  id: number;
  name: string;
  status: IEmployeeStatus; // Статус: удаленно или в офисе
};

export enum IEmployeeStatus {
  REMOTE = "remote",
  SICK = "sick",
  VACATION = "vacation",
}
