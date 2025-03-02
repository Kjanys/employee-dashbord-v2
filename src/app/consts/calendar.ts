import { CalendarDirections } from "../types/system/i-calendar";

export const DEFAULT_DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const DEFAULT_MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const CALENDAR_VARIANTS = {
  initial: (direction: CalendarDirections.LEFT | CalendarDirections.RIGHT) => ({
    x: direction === CalendarDirections.LEFT ? -100 : 100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (direction: CalendarDirections.LEFT | CalendarDirections.RIGHT) => ({
    x: direction === CalendarDirections.LEFT ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

export const CALEDAR_STOK_VALUE = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};
