import {
  Car,
  GraduationCap,
  House,
  Pill,
  PlanetEarth,
  XmarkShapeFill,
} from "@gravity-ui/icons";
import { IIncidentStatus } from "../types/common/i-incident";

// Вспомогательная функция для получения иконки статуса
export const getStatusIcon = (status: IIncidentStatus) => {
  switch (status) {
    case IIncidentStatus.REMOTE:
      return House;
    case IIncidentStatus.SICK:
      return Pill;
    case IIncidentStatus.VACATION:
      return PlanetEarth;
    case IIncidentStatus.STUDY:
      return GraduationCap;
    case IIncidentStatus.OTHER:
      return Car;
    default:
      return XmarkShapeFill;
  }
};
