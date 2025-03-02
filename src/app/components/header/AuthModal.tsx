/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LOGIN_DEFAULT_FORM_VALUES,
  REGISTER_DEFAULT_FORM_VALUES,
} from "@/app/consts/auth";
import {
  LOGIN_VALIDATION_RULES,
  REGISTER_VALIDATION_RULES,
} from "@/app/consts/validations";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/app/store/api/api-employee";
import { IFormState } from "@/app/types/system/i-form";
import { CircleQuestion } from "@gravity-ui/icons";
import {
  Button,
  Icon,
  Modal,
  Popover,
  Text,
  TextInput,
} from "@gravity-ui/uikit";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";

interface AuthModalProps {
  isModalOpen: boolean;
  isLoginForm: boolean;
  setIsLoginForm: (value: SetStateAction<boolean>) => void;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
}

export default function AuthModal({
  isModalOpen,
  isLoginForm,
  setIsLoginForm,
  setIsModalOpen,
}: AuthModalProps) {
  const dispatch = useDispatch();

  // Состояние формы
  const [loginForm, setLoginForm] = useState<IFormState>(
    LOGIN_DEFAULT_FORM_VALUES
  );
  const [registerForm, setRegisterForm] = useState<IFormState>(
    REGISTER_DEFAULT_FORM_VALUES
  );

  // Ошибки
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>(
    {}
  );

  // RTK Query мутации
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] =
    useLoginUserMutation();
  const [registerUser, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterUserMutation();

  // Закрытие модального окна
  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Сброс формы
  const resetForm = () => {
    setLoginForm(LOGIN_DEFAULT_FORM_VALUES);
    setRegisterForm(REGISTER_DEFAULT_FORM_VALUES);
    setLoginErrors({});
    setRegisterErrors({});
  };

  // Валидация формы
  const validateForm = (form: IFormState, rules: Record<string, any>) => {
    const errors: Record<string, string> = {};

    for (const [field, rule] of Object.entries(rules)) {
      const value = form[field as keyof IFormState];

      if (rule.required && !value) {
        errors[field] = rule.message;
      }

      if (rule.validate) {
        const validationError = rule.validate(value, form);
        if (validationError) {
          errors[field] = validationError;
        }
      }
    }

    return errors;
  };

  // Обработчик входа
  const handleLogin = async () => {
    const errors = validateForm(loginForm, LOGIN_VALIDATION_RULES);
    setLoginErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const user = await loginUser({
        login: loginForm.login,
        password: loginForm.password,
      }).unwrap();
      localStorage.setItem("token", user.token); // Сохраняем токен
      dispatch(login(user)); // Обновляем состояние Redux
      handleModalClose();
    } catch (error) {
      setLoginErrors({ general: "Неверный логин или пароль" });
    }
  };

  // Обработчик регистрации
  const handleRegister = async () => {
    const errors = validateForm(registerForm, REGISTER_VALIDATION_RULES);
    setRegisterErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const user = await registerUser({
        name: registerForm.name!,
        surname: registerForm.surname!,
        login: registerForm.login,
        password: registerForm.password,
        email: registerForm.email!,
      }).unwrap();
      localStorage.setItem("token", user.token); // Сохраняем токен
      dispatch(login(user)); // Обновляем состояние Redux
      handleModalClose();
    } catch (error) {
      setRegisterErrors({ general: "Ошибка регистрации" });
    }
  };

  // Обработчик отправки формы
  const handleFormSubmit = () => {
    if (isLoginForm) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  // Обработчик нажатия клавиши Enter
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Предотвращаем стандартное поведение
        handleFormSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginForm, loginForm, registerForm]);

  // Обновление состояния формы
  const handleFormChange = (field: keyof IFormState, value: string) => {
    if (isLoginForm) {
      setLoginForm((prev) => ({ ...prev, [field]: value }));
    } else {
      setRegisterForm((prev) => ({ ...prev, [field]: value }));
    }
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
                value={loginForm.login}
                onChange={(e) => handleFormChange("login", e.target.value)}
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
                value={loginForm.password}
                onChange={(e) => handleFormChange("password", e.target.value)}
                validationState={loginErrors.password ? "invalid" : undefined}
                errorMessage={loginErrors.password}
                placeholder="Введите пароль"
                className="w-full"
              />
            </div>
            {loginErrors.general && (
              <Text color="danger">{loginErrors.general}</Text>
            )}
          </div>
        ) : (
          // Форма регистрации
          <div className="flex flex-col gap-4">
            <div>
              <Text variant="subheader-2" className="mb-1">
                Логин
              </Text>
              <TextInput
                value={registerForm.login}
                onChange={(e) => handleFormChange("login", e.target.value)}
                validationState={registerErrors.login ? "invalid" : undefined}
                errorMessage={registerErrors.login}
                placeholder="Введите логин"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Email
              </Text>
              <TextInput
                value={registerForm.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                validationState={registerErrors.email ? "invalid" : undefined}
                errorMessage={registerErrors.email}
                placeholder="Введите email"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="subheader-2" className="mb-1">
                Имя
              </Text>
              <TextInput
                value={registerForm.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
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
                value={registerForm.surname}
                onChange={(e) => handleFormChange("surname", e.target.value)}
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
                value={registerForm.password}
                onChange={(e) => handleFormChange("password", e.target.value)}
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
                value={registerForm.repeatPassword}
                onChange={(e) =>
                  handleFormChange("repeatPassword", e.target.value)
                }
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
                  value={registerForm.key}
                  onChange={(e) => handleFormChange("key", e.target.value)}
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
            {registerErrors.general && (
              <Text color="danger">{registerErrors.general}</Text>
            )}
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
