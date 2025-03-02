export type User = {
  id: number; // Изменяем тип на number
  name: string;
  surname: string;
  login: string;
  email: string; // Добавляем email
};

export type IUserRegistrationPayload = {
  name: string;
  surname: string;
  login: string;
  email: string; // Добавляем email
  password: string;
};

export type IUserLoginPayload = { login: string; password: string };

export type IUserAnswer = {
  token: string;
} & User;
