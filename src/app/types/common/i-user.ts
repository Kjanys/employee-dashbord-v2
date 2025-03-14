export type User = {
  id: number;
  name: string;
  surname: string;
  login: string;
  email: string;
};

export type IUserRegistrationPayload = {
  name: string;
  surname: string;
  login: string;
  email: string;
  password: string;
  key: string;
};

export type IUserLoginPayload = { login: string; password: string };

export type IUserAnswer = {
  token: string;
} & User;
