export type User = {
  id: string;
  name: string;
  surname: string;
  login: string;
};

export type IUserRegistrationPayload = {
  name: string;
  surname: string;
  login: string;
  password: string;
};
