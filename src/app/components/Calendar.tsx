// src/app/components/Calendar.tsx
'use client';
import { ArrowLeft, ArrowRight } from '@gravity-ui/icons';
import { Button, Card, Icon, Text } from '@gravity-ui/uikit';
import { useEffect, useState } from 'react';

const DEFAULT_DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const DEFAULT_MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number>(0);
  const [startDay, setStartDay] = useState<number>(0);

  const isCurrentMonth =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const updateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(daysInMonth);

    const startDay = new Date(year, month, 1).getDay();
    setStartDay(startDay === 0 ? 6 : startDay - 1);
  };

  const handleSwitchMonth = (isPrev: boolean) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (isPrev ? -1 : 1));
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

  return (
    <Card className="p-4 dark:bg-gray-700 flex flex-col h-full">
      {/* Шапка с кнопками и названием месяца */}
      <div className="flex justify-between items-center mb-4">
        {/* Кнопки для мобильных */}
        <div className="sm:hidden flex gap-2">
          <Button onClick={() => handleSwitchMonth(true)} view="outlined" size="m">
            <Icon data={ArrowLeft} size={14} />
          </Button>
          <Button onClick={() => handleSwitchMonth(false)} view="outlined" size="m">
            <Icon data={ArrowRight} size={14} />
          </Button>
        </div>

        {/* Кнопки для десктопов */}
        <Button onClick={() => handleSwitchMonth(true)} view="outlined" size="xl" className="hidden sm:block">
          <Icon data={ArrowLeft} size={18} />
        </Button>

        <div className="flex-1 text-center mx-2">
          <Text variant="header-2" className="dark:text-white text-lg sm:text-2xl">
            {DEFAULT_MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
        </div>

        {/* Кнопки для десктопов */}
        <div className="hidden sm:flex gap-2">
          <Button
            onClick={handleToday}
            view={isCurrentMonth ? 'outlined' : 'normal'}
            disabled={isCurrentMonth}
            size="xl"
          >
            Сегодня
          </Button>
          <Button onClick={() => handleSwitchMonth(false)} view="outlined" size="xl">
            <Icon data={ArrowRight} size={18} />
          </Button>
        </div>
      </div>

      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {DEFAULT_DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Календарь */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-1 overflow-y-auto">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2 sm:p-4 border rounded-lg text-center dark:border-gray-600" />
        ))}

        {days.map((day) => (
          <div
            key={day}
            className="p-1 sm:p-2 border rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer dark:border-gray-600 dark:text-white"
          >
            {day}
          </div>
        ))}
      </div>
    </Card>
  );
}