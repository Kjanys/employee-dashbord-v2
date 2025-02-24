"use client";
import { CircleQuestion } from "@gravity-ui/icons";
import {
  Button,
  Icon,
  Modal,
  Popover,
  Text,
  TextInput,
} from "@gravity-ui/uikit";
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";

interface RegistrationModalProps {
  isModalOpen: boolean;
  isLoginForm: boolean;
  setIsLoginForm: (value: SetStateAction<boolean>) => void;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
}

export default function RegistrationModal({
  isModalOpen,
  isLoginForm,
  setIsLoginForm,
  setIsModalOpen,
}: RegistrationModalProps) {
  const dispatch = useDispatch();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [key, setKey] = useState("");
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>(
    {}
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setLoginValue("");
    setPassword("");
    setName("");
    setSurname("");
    setRepeatPassword("");
    setKey("");
    setLoginErrors({});
    setRegisterErrors({});
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginValue) newErrors.login = "Логин обязателен";
    if (!password) newErrors.password = "Пароль обязателен";

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginValue) newErrors.login = "Логин обязателен";
    if (!name) newErrors.name = "Имя обязательно";
    if (!surname) newErrors.surname = "Фамилия обязательна";
    if (!password) newErrors.password = "Пароль обязателен";
    if (!repeatPassword) newErrors.repeatPassword = "Повторите пароль";
    if (password !== repeatPassword)
      newErrors.repeatPassword = "Пароли не совпадают";
    if (!key) newErrors.key = "Ключ обязателен";
    if (key !== process.env.NEXT_PUBLIC_REGISTRATION_KEY)
      newErrors.key = "Неверный ключ";

    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (isLoginForm) {
      if (!validateLoginForm()) return;
      // Логика входа
      // TODO временно
      dispatch(
        login({
          id: "1",
          name: name,
          surname: surname,
          login: loginValue,
        })
      );
      console.log("Вход:", { loginValue, password });
    } else {
      if (!validateRegisterForm()) return;
      // Логика регистрации
      // TODO временно
      dispatch(
        login({
          id: "1",
          name: name,
          surname: surname,
          login: loginValue,
        })
      );
      console.log("Регистрация:", { loginValue, name, surname, password, key });
    }
    handleModalClose();
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <div className="p-4 w-[90vw] max-w-[400px] overflow-y-hidden">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            view={isLoginForm ? "normal" : "flat"}
            onClick={() => setIsLoginForm(true)}
          >
            Вход
          </Button>
          <Button
            view={!isLoginForm ? "normal" : "flat"}
            onClick={() => setIsLoginForm(false)}
          >
            Регистрация
          </Button>
        </div>

        {isLoginForm ? (
          // Форма входа
          <div className="flex flex-col gap-4">
            <div>
              <Text variant="subheader-2" className="mb-1">
                Логин
              </Text>
              <TextInput
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                validationState={loginErrors.login ? "invalid" : undefined}
                errorMessage={loginErrors.login}
                placeholder="Введите логин"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Пароль
              </Text>
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validationState={loginErrors.password ? "invalid" : undefined}
                errorMessage={loginErrors.password}
                placeholder="Введите пароль"
                className="w-full"
              />
            </div>
          </div>
        ) : (
          // Форма регистрации
          <div className="flex flex-col gap-4">
            <div>
              <Text variant="subheader-2" className="mb-1">
                Логин
              </Text>
              <TextInput
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                validationState={registerErrors.login ? "invalid" : undefined}
                errorMessage={registerErrors.login}
                placeholder="Введите логин"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Имя
              </Text>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationState={registerErrors.name ? "invalid" : undefined}
                errorMessage={registerErrors.name}
                placeholder="Введите имя"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Фамилия
              </Text>
              <TextInput
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                validationState={registerErrors.surname ? "invalid" : undefined}
                errorMessage={registerErrors.surname}
                placeholder="Введите фамилию"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Пароль
              </Text>
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validationState={
                  registerErrors.password ? "invalid" : undefined
                }
                errorMessage={registerErrors.password}
                placeholder="Введите пароль"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Повторите пароль
              </Text>
              <TextInput
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                validationState={
                  registerErrors.repeatPassword ? "invalid" : undefined
                }
                errorMessage={registerErrors.repeatPassword}
                placeholder="Повторите пароль"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Ключ
              </Text>
              <div className="flex items-center gap-2 h-[56px] relative">
                <TextInput
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  validationState={registerErrors.key ? "invalid" : undefined}
                  placeholder="Введите ключ"
                  className="w-full"
                />
                <Popover content="Ключ можно получить у разработчика">
                  <Button view="flat" className="h-10">
                    <Icon data={CircleQuestion} />
                  </Button>
                </Popover>
                {registerErrors.key && (
                  <Text
                    color="danger"
                    className="absolute bottom-[-20px] left-0 text-sm"
                  >
                    {registerErrors.key}
                  </Text>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button onClick={handleFormSubmit} view="normal">
            {isLoginForm ? "Войти" : "Зарегистрироваться"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
