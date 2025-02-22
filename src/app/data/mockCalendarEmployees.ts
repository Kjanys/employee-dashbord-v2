import { IEmployee, IEmployeeStatus } from "../types/common/i-employee";

export const mockCalendarEmployees: IEmployee[] = [
  { id: 1, name: "Иван Иванов", status: IEmployeeStatus.REMOTE },
  { id: 2, name: "Петр Петров", status: IEmployeeStatus.SICK },
  { id: 3, name: "Сидор Сидоров", status: IEmployeeStatus.VACATION },
  { id: 4, name: "Мария Кузнецова", status: IEmployeeStatus.REMOTE },
  { id: 5, name: "Анна Смирнова", status: IEmployeeStatus.SICK },
];
