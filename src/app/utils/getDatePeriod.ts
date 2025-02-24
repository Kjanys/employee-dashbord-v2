import { formatDate } from "./formatDate";

export const getDatePeriod = (selectedPeriod: {
  start: Date;
  end: Date;
}) => `${formatDate(selectedPeriod.start)}${" "}
  - ${formatDate(selectedPeriod.end)}`;
