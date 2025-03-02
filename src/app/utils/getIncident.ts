/* eslint-disable @typescript-eslint/no-explicit-any */
import { IIncident } from "../types/common/i-incident";

export const getIncident = (data: any): IIncident =>
  ({
    id: data.id,
    userId: data.userId,
    name: data.name,
    surname: data.surname,
    status: data.status,
    date: !data.isPeriod
      ? new Date(data.date!)
      : {
          start: new Date(data.startDate!),
          end: new Date(data.endDate!),
        },
  } as IIncident);
