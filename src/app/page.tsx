'use client';
import { configure } from '@gravity-ui/uikit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from './components/calendar/Calendar';
import Header from './components/Header';
import { mockCalendarIncidents } from './data/mockCalendarIncidents';
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
      dispatch(setCurrentMonthEmployees(mockCalendarIncidents));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col h-full overflow-hidden"> {/* Добавляем h-full */}
      {/* Шапка */}
      <Header />

      {/* Основной контент */}
        <div className="p-3 flex-1 h-full"> {/* Добавляем h-full */}
          <Calendar />
        </div>

      {/* Футер */}
      <AppFooter />
    </div>
  );
}