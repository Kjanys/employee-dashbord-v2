import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MethodType } from "../../types/system/i-query";
import {
  IUserAnswer,
  IUserLoginPayload,
  IUserRegistrationPayload,
} from "../../types/common/i-user";

export const EmployeeApi = createApi({
  reducerPath: "employee-api",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Логин пользователя
    loginUser: builder.mutation<IUserAnswer, IUserLoginPayload>({
      query: (data: IUserLoginPayload) => ({
        url: `/auth/login`,
        method: MethodType.POST,
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Регистрация пользователя
    registerUser: builder.mutation<IUserAnswer, IUserRegistrationPayload>({
      query: (data: IUserRegistrationPayload) => ({
        url: `/auth/register`,
        method: MethodType.POST,
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Автовход пользователя
    autoLoginUser: builder.query<IUserAnswer, void>({
      query: () => ({
        url: `/auth/me`,
        method: MethodType.GET,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useAutoLoginUserQuery,
} = EmployeeApi;
