import { IIncident } from "../common/i-incident";

export type IIncidentPayload = { massage: string; incident: IIncident };

export type IIncidentDeletePayload = { massage: string; id: number };
