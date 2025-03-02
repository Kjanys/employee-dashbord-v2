"use client";
import { Book, Moon, Sun } from "@gravity-ui/icons";
import { Button, Icon, Popover, User } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";
import { logout } from "../../store/slices/userSlice";
import { RootState } from "../../store/store";
import AuthModal from "./AuthModal";
import JournalModal from "./journal/JournalModal";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const { theme } = useSelector((state: RootState) => state.theme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLogin = () => {
    setIsModalOpen(true);
    setIsLoginForm(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    setIsPopoverOpen(false);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleJournal = () => {
    setIsJournalModalOpen(true);
  };

  return (
    <header className="shadow-sm p-4 flex justify-between items-center border-b-[1px] border-b-[solid] border-b-[var(--g-color-line-generic)]">
      <div className="text-xl font-semibold">Календарь</div>
      <div className="flex items-center gap-4">
        {/* Переключатель темы */}
        <Button onClick={handleToggleTheme} view="raised">
          <Icon data={theme === "light" ? Moon : Sun} />
        </Button>

        {/* Кнопка "Журнал" (только для авторизованных пользователей) */}
        {isAuthenticated && (
          <Button onClick={handleJournal} view="raised">
            <Icon data={Book} />
          </Button>
        )}

        {/* Кнопка входа или компонент пользователя */}
        {isAuthenticated && user ? (
          <Popover
            content={
              <div className="p-2">
                <Button onClick={handleLogout} view="flat-danger" size="m">
                  Выйти
                </Button>
              </div>
            }
            open={isPopoverOpen}
            onOpenChange={(open) => setIsPopoverOpen(open)}
            placement="bottom-end"
          >
            <div
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="cursor-pointer"
            >
              <User
                avatar={{
                  text: "AS",
                  theme: "brand",
                  title: `${user.name + " " + user.surname}`,
                  backgroundColor: "var(--g-color-private-blue-650-solid)",
                }}
                name={`${user.name + " " + user.surname}`}
                size="m"
              />
            </div>
          </Popover>
        ) : (
          <Button onClick={handleLogin} view="raised">
            Войти
          </Button>
        )}
      </div>

      {/* Модальное окно регистрации */}
      <AuthModal
        isModalOpen={isModalOpen}
        isLoginForm={isLoginForm}
        setIsLoginForm={setIsLoginForm}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Модальное окно журнала */}
      <JournalModal
        isModalOpen={isJournalModalOpen}
        setIsModalOpen={setIsJournalModalOpen}
      />
    </header>
  );
}
