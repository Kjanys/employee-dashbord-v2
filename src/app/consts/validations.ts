import { IFormState } from "../types/system/i-form";

// Правила валидации для формы входа
export const LOGIN_VALIDATION_RULES = {
  login: { required: true, message: "Логин обязателен" },
  password: { required: true, message: "Пароль обязателен" },
};

// Правила валидации для формы регистрации
export const REGISTER_VALIDATION_RULES = {
  login: { required: true, message: "Логин обязателен" },
  name: { required: true, message: "Имя обязательно" },
  surname: { required: true, message: "Фамилия обязательна" },
  email: { required: true, message: "Email обязателен" },
  password: { required: true, message: "Пароль обязателен" },
  repeatPassword: {
    required: true,
    message: "Повторите пароль",
    validate: (value: string, form: IFormState) =>
      value === form.password || "Пароли не совпадают",
  },
  key: {
    required: true,
    message: "Ключ обязателен",
    validate: (value: string) =>
      value === process.env.NEXT_PUBLIC_REGISTRATION_KEY || "Неверный ключ",
  },
};
