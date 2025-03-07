import {
  IIncidentDeletePayload,
  IIncidentJournalPaylod,
  IIncidentPayload,
} from "@/app/types/system/i-incident";
import { getConvertDate } from "@/app/utils/getConvertDate";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IIncident } from "../../types/common/i-incident";
import { MethodType } from "../../types/system/i-query";

export const IncidentsApi = createApi({
  reducerPath: "incidents-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Incident"],
  endpoints: (builder) => ({
    // Получение событий
    fetchIncidents: builder.query<IIncident[], IIncidentJournalPaylod>({
      query: (data: IIncidentJournalPaylod) => ({
        url: `/incidents/get`,
        method: MethodType.POST,
        body: data,
      }),
      transformResponse: (response: IIncident[]) =>
        response.map((item: IIncident) => getConvertDate(item)),
      providesTags: ["Incident"],
    }),

    // Создание нового события
    createIncident: builder.mutation<IIncidentPayload, IIncident>({
      query: (newIncident) => ({
        url: `/incidents/create`,
        method: MethodType.POST,
        body: newIncident,
      }),
      transformResponse: (response: IIncidentPayload) => ({
        ...response,
        incident: getConvertDate(response.incident),
      }),
      invalidatesTags: ["Incident"],
    }),

    // Обновление события
    updateIncident: builder.mutation<IIncidentPayload, IIncident>({
      query: (updatedIncident) => ({
        url: `/incidents/update`,
        method: MethodType.PUT,
        body: updatedIncident,
      }),
      transformResponse: (response: IIncidentPayload) => ({
        ...response,
        incident: getConvertDate(response.incident),
      }),
      invalidatesTags: ["Incident"],
    }),

    // Удаление события
    deleteIncident: builder.mutation<IIncidentDeletePayload, number>({
      query: (incidentId) => ({
        url: `/incidents/delete`,
        method: MethodType.DELETE,
        body: { id: incidentId },
      }),
      invalidatesTags: ["Incident"],
    }),
  }),
});

export const {
  useFetchIncidentsQuery,
  useCreateIncidentMutation,
  useUpdateIncidentMutation,
  useDeleteIncidentMutation,
} = IncidentsApi;
