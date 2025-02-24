import { IIncident, IIncidentStatus } from "../types/common/i-incident";

export const mockJournal: IIncident[] = [
  {
    id: 1,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 11,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 2, 2), // Единичная дата: 15 февраля 2025
  },
  {
    id: 12,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 2, 3), // Единичная дата: 15 февраля 2025
  },
  {
    id: 13,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 4), // Единичная дата: 15 февраля 2025
  },
  {
    id: 14,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 2, 5), // Единичная дата: 15 февраля 2025
  },
  {
    id: 15,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 7), // Единичная дата: 15 февраля 2025
  },
  {
    id: 16,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 10), // Единичная дата: 15 февраля 2025
  },
  {
    id: 17,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 12), // Единичная дата: 15 февраля 2025
  },
  {
    id: 18,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 19,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.VACATION,
    date: new Date(2025, 2, 18), // Единичная дата: 15 февраля 2025
  },
  {
    id: 20,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 24), // Единичная дата: 15 февраля 2025
  },
  {
    id: 21,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 25), // Единичная дата: 15 февраля 2025
  },
  {
    id: 22,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.VACATION,
    date: new Date(2025, 2, 26), // Единичная дата: 15 февраля 2025
  },
  {
    id: 23,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 3, 27), // Единичная дата: 15 февраля 2025
  },
  {
    id: 24,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 27), // Единичная дата: 15 февраля 2025
  },
];
