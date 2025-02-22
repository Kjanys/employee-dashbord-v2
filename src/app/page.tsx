// src/app/page.tsx
'use client';
import { configure } from '@gravity-ui/uikit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from './components/Calendar';
import Header from './components/Header';
import { mockCalendarEmployees } from './data/mockCalendarEmployees';
import { setCurrentMonthEmployees } from './store/slices/calendarSlice';
import { RootState } from './store/store';
import AppFooter from './components/Footer';

configure({
  lang: 'ru',
});

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  // Загружаем моковые данные при монтировании компонента
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setCurrentMonthEmployees(mockCalendarEmployees));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col h-full"> {/* Добавляем h-full */}
      {/* Шапка */}
      <Header />

      {/* Основной контент */}
      <div className="flex-1 p-6 flex flex-col h-full"> {/* Добавляем h-full */}
        <div className="flex-1 h-full"> {/* Добавляем h-full */}
          <Calendar />
        </div>
      </div>

      {/* Футер */}
      <AppFooter />
    </div>
  );
}