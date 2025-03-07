import { PeriodName } from "../types/common/i-incident";
import { IPeriod } from "../types/system/i-period";

export const getPeriodFromName = (
  name: PeriodName,
  period?: IPeriod
): IPeriod | null => {
  switch (name) {
    case PeriodName.DAY:
      return {
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59,
          59,
          999
        ),
      };
    case PeriodName.WEEK:
      return {
        startDate: new Date(
          new Date().setDate(
            new Date().getDate() -
              new Date().getDay() +
              (new Date().getDay() === 0 ? -6 : 1)
          )
        ),
        endDate: new Date(
          new Date().setDate(
            new Date().getDate() -
              new Date().getDay() +
              (new Date().getDay() === 0 ? 0 : 7)
          )
        ),
      };
    case PeriodName.MONTH:
      return {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ),
      };
    case PeriodName.YEAR:
      return {
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31),
      };
    case PeriodName.PERIOD:
      return period ?? null;
    default:
      return null;
  }
};
