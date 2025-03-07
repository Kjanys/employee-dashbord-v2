import { IPeriod } from "../types/system/i-period";
import { formatDate } from "./formatDate";

export const getDatePeriod = (selectedPeriod: IPeriod | null) =>
  selectedPeriod
    ? `${formatDate(selectedPeriod.startDate)}${" "}
  - ${formatDate(selectedPeriod.endDate)}`
    : "";
