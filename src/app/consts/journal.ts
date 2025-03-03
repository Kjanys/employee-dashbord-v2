import { IIncidentStatus } from "../types/common/i-incident";
import { IPeriod } from "../types/system/i-period";

export const DICT_STATUS = {
  [IIncidentStatus.REMOTE]: {
    name: "Удалённо",
    color: "--g-color-private-blue-450-solid",
  },
  [IIncidentStatus.SICK]: {
    name: "Болезнь",
    color: "--g-color-private-red-450-solid",
  },
  [IIncidentStatus.VACATION]: {
    name: "Отпуск",
    color: "--g-color-private-orange-450-solid",
  },
  [IIncidentStatus.STUDY]: {
    name: "Учеба",
    color: "--g-color-private-purple-450-solid",
  },
  [IIncidentStatus.OTHER]: {
    name: "Другое",
    color: "--g-color-private-green-450-solid",
  },
};

export const DEFAULT_SELECTED_STATUS = {
  [IIncidentStatus.REMOTE]: true,
  [IIncidentStatus.SICK]: true,
  [IIncidentStatus.VACATION]: true,
  [IIncidentStatus.STUDY]: true,
  [IIncidentStatus.OTHER]: true,
};

export const DEFAULT_JOURNAL_PERIOD: IPeriod = {
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Начало текущего месяца
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Конец текущего месяца
};
