import { IPeriod } from "../types/system/i-period";
import { formatDate } from "./formatDate";

export const getDatePeriod = (selectedPeriod: IPeriod) => `${formatDate(
  selectedPeriod.startDate
)}${" "}
  - ${formatDate(selectedPeriod.endDate)}`;
