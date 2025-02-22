// src/app/components/Header.tsx
'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/navigation';
import { Button, User, Icon } from '@gravity-ui/uikit';
import { Moon, Sun } from '@gravity-ui/icons';
import { toggleTheme } from '../store/slices/themeSlice';
//import { logout } from '../store/slices/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleLogin = () => {
    router.push('/login');
  };

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push('/');
//   };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="shadow-sm p-4 flex justify-between items-center border-b-[1px] border-b-[solid] border-b-[var(--g-color-line-generic)]">
      <div className="text-xl font-semibold">Календарь сотрудников</div>
      <div className="flex items-center gap-4">
        {/* Переключатель темы */}
        <Button onClick={handleToggleTheme} view="normal-contrast">
          <Icon data={theme === 'light' ? Moon : Sun} />
        </Button>

        {/* Кнопка входа или компонент пользователя */}
        {isAuthenticated && user ? (
          <User
            name={user.name}
            description={user.email}
            avatar={{ text: user.name }}
            //onClick={handleLogout}
          />
        ) : (
          <Button onClick={handleLogin} view="normal-contrast">
            Войти
          </Button>
        )}
      </div>
    </header>
  );
}