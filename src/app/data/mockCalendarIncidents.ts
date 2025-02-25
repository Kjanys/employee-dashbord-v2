import { IIncident, IIncidentStatus } from "../types/common/i-incident";

export const mockCalendarIncidents: IIncident[] = [
  {
    id: 1,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 11,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 12,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 13,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 14,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 15,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 16,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 17,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 15), // Единичная дата: 15 февраля 2025
  },
  {
    id: 2,
    userId: 2,
    name: "Петр",
    surname: "Петров",
    status: IIncidentStatus.SICK,
    date: { start: new Date(2025, 1, 10), end: new Date(2025, 1, 12) }, // Период: с 10 по 12 февраля 2025
  },
  {
    id: 3,
    userId: 3,
    name: "Сидор",
    surname: "Сидоров",
    status: IIncidentStatus.VACATION,
    date: { start: new Date(2025, 1, 20), end: new Date(2025, 1, 25) }, // Период: с 20 по 25 февраля 2025
  },
  {
    id: 4,
    userId: 4,
    name: "Мария",
    surname: "Кузнецова",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 5), // Единичная дата: 5 февраля 2025
  },
  {
    id: 5,
    userId: 5,
    name: "Анна",
    surname: "Смирнова",
    status: IIncidentStatus.SICK,
    date: { start: new Date(2025, 1, 1), end: new Date(2025, 1, 3) }, // Период: с 1 по 3 февраля 2025
  },
  {
    id: 6,
    userId: 6,
    name: "Олег",
    surname: "Новиков",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 18), // Единичная дата: 18 февраля 2025
  },
  {
    id: 61,
    userId: 6,
    name: "Олег",
    surname: "Новиков",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 18), // Единичная дата: 18 февраля 2025
  },
  {
    id: 62,
    userId: 6,
    name: "Олег",
    surname: "Новиков",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 18), // Единичная дата: 18 февраля 2025
  },
  {
    id: 63,
    userId: 6,
    name: "Олег",
    surname: "Новиков",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 18), // Единичная дата: 18 февраля 2025
  },
  {
    id: 64,
    userId: 6,
    name: "Олег",
    surname: "Новиков",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 18), // Единичная дата: 18 февраля 2025
  },
  {
    id: 7,
    userId: 7,
    name: "Елена",
    surname: "Воробьева",
    status: IIncidentStatus.VACATION,
    date: { start: new Date(2025, 1, 22), end: new Date(2025, 1, 28) }, // Период: с 22 по 28 февраля 2025
  },
  {
    id: 8,
    userId: 8,
    name: "Дмитрий",
    surname: "Козлов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 1, 7), // Единичная дата: 7 февраля 2025
  },
  {
    id: 9,
    userId: 9,
    name: "Татьяна",
    surname: "Морозова",
    status: IIncidentStatus.REMOTE,
    date: { start: new Date(2025, 1, 12), end: new Date(2025, 1, 13) }, // Период: с 12 по 13 февраля 2025
  },
  {
    id: 10,
    userId: 10,
    name: "Алексей",
    surname: "Павлов",
    status: IIncidentStatus.VACATION,
    date: new Date(2025, 1, 28), // Единичная дата: 28 февраля 2025
  },
  {
    id: 311,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 312,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 313,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 314,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 315,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 316,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 317,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 411,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 412,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 413,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 414,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 415,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 416,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 417,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 1, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 311,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 312,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 313,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 314,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 315,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 316,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 317,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 1), // Единичная дата: 15 февраля 2025
  },
  {
    id: 411,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.SICK,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 412,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.STUDY,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 413,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 414,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.OTHER,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 415,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 416,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
  {
    id: 417,
    userId: 1,
    name: "Иван",
    surname: "Иванов",
    status: IIncidentStatus.REMOTE,
    date: new Date(2025, 2, 8), // Единичная дата: 15 февраля 2025
  },
];
