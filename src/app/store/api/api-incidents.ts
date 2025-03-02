// store/api/api-incidents.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IIncident, IIncidentStatus } from "../../types/common/i-incident";
import { MethodType } from "../../types/system/i-query";
import {
  IIncidentDeletePayload,
  IIncidentPayload,
} from "@/app/types/system/i-incident";

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
    fetchIncidents: builder.query<
      IIncident[],
      {
        userId: number | undefined;
        startDate: Date;
        endDate: Date;
        statuses: IIncidentStatus[];
      }
    >({
      query: ({ userId, startDate, endDate, statuses }) => ({
        url: `/incidents/get`,
        method: MethodType.POST,
        body: { userId, startDate, endDate, statuses },
      }),
      providesTags: ["Incident"],
    }),

    // Создание нового события
    createIncident: builder.mutation<IIncidentPayload, IIncident>({
      query: (newIncident) => ({
        url: `/incidents/create`,
        method: MethodType.POST,
        body: newIncident,
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
