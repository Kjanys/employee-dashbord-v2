'use client';
import { getInitials } from '@/app/utils/getInitials';
import { ArrowLeft, ArrowRight, ArrowsRotateLeft } from '@gravity-ui/icons';
import { Button, Card, Icon, Popover, Text, UserLabel } from '@gravity-ui/uikit';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CALENDAR_VARIANTS, DEFAULT_DAYS_OF_WEEK, DEFAULT_MONTH_NAMES } from '../../consts/calendar';
import { RootState } from '../../store/store';
import { CalendarDirections } from '../../types/system/i-calendar';
import { isEmployeeInDay } from '../../utils/getIsEmployeeInDay';
import { getStatusClass } from '../../utils/getStatusClass';
import { getStatusIcon } from '../../utils/getStatusIcon';
import DaySheet from '../DaySheet';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number>(0);
  const [startDay, setStartDay] = useState<number>(0);
  const [endDay, setEndDay] = useState<number>(0);
  const [direction, setDirection] = useState<CalendarDirections>(CalendarDirections.RIGHT);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverDay, setPopoverDay] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null); // Выбранный день
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Состояние для открытия/закрытия Sheet

  const { currentMonthEmployees } = useSelector((state: RootState) => state.calendar);

  const isCurrentMonth = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const now = new Date();
  
    return currentMonth === now.getMonth() && currentYear === now.getFullYear();
  }, [currentDate]);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // 640px — breakpoint для мобильных устройств
    };

    handleResize(); // Проверяем при загрузке
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(daysInMonth);

    const startDay = new Date(year, month, 1).getDay();
    setStartDay(startDay === 0 ? 6 : startDay - 1);

    const endDay = new Date(year, month + 1, 0).getDay();
    setEndDay(endDay === 0 ? 0 : 7 - endDay);
  };

  const handleSwitchMonth = (isPrev: boolean) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (isPrev ? -1 : 1));
    setCurrentDate(newDate);
    setDirection(isPrev ? CalendarDirections.LEFT : CalendarDirections.RIGHT);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setDirection(CalendarDirections.RIGHT);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, day: number) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverDay(day);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setPopoverDay(null);
  };

  // Обработчик клика на ячейку (для мобильной версии)
  const handleDayClick = (day: number) => {
    if (isMobile) {
      setSelectedDay(day);
      setIsSheetOpen(true);
    }
  };

  // Закрытие Sheet
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedDay(null);
  };

  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

  return (
    <div className="h-full overflow-hidden">
      <Card className="p-4 dark:bg-gray-700 flex flex-col h-full">
        {/* Шапка с кнопками и названием месяца */}
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => handleSwitchMonth(true)}
            view="outlined"
            size="l"
            className="sm:size-xl flex justify-center items-center"
          >
            <Icon data={ArrowLeft} size={18} />
          </Button>

          <div className="flex-1 text-center mx-2">
            <Text variant="header-2" className="text-lg sm:text-2xl">
              {DEFAULT_MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleToday}
              view={isCurrentMonth ? 'outlined' : 'normal'}
              disabled={isCurrentMonth}
              size="l"
              className="sm:size-xl w-12 flex justify-center items-center"
            >
              <Icon data={ArrowsRotateLeft} size={18} />
            </Button>
            <Button
              onClick={() => handleSwitchMonth(false)}
              view="outlined"
              size="l"
              className="sm:size-xl flex justify-center items-center"
            >
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

        {/* Календарь с анимацией */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDate.toISOString()}
            custom={direction}
            variants={CALENDAR_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-7 gap-1 sm:gap-2 flex-1 overflow-hidden"
          >
            {/* Пустые ячейки в начале */}
            {Array.from({ length: startDay }).map((_, index) => (
              <div
                key={`empty-start-${index}`}
                className="p-2 sm:p-4 border rounded-lg text-center dark:border-gray-600 opacity-50"
              />
            ))}

            {/* Дни месяца */}
            {days.map((day) => {
              const employeesInDay = currentMonthEmployees.filter((employee) =>
                isEmployeeInDay(employee, day, currentDate.getMonth(), currentDate.getFullYear())
              );

              // На мобильных устройствах показываем только одну колонку
              const showTwoColumns = !isMobile && employeesInDay.length > 3;
              const visibleEmployees = isMobile ? employeesInDay.slice(0, 2) : showTwoColumns ? employeesInDay.slice(0, 6) : employeesInDay;
              const invisibleEmployees = isMobile ? employeesInDay.slice(2) : showTwoColumns ? employeesInDay.slice(6) : [];

              return (
                <div
                  key={day}
                  className="p-1 sm:p-2 border rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer dark:border-gray-500 flex flex-col justify-start"
                  onClick={() => handleDayClick(day)} // Обработчик клика на ячейку
                >
                  <div className="text-sm font-semibold mb-2">{day}</div>
                  <div className={`grid ${showTwoColumns ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                    {visibleEmployees.map((employee) => (
                      <UserLabel
                        key={employee.id}
                        type={isMobile ? "empty" : "person"}
                        avatar={{
                          icon: getStatusIcon(employee.status),
                        }}
                        size={isMobile ? "xs" : "m"}
                        description={employee.name}
                        text={
                          isMobile 
                            ? getInitials(employee.name, employee.surname) // Инициалы на мобильных устройствах
                            : showTwoColumns && (employee.name + " " + employee.surname).length > 10
                            ? `${(employee.name + " " + employee.surname).slice(0, 10)}...`
                            : employee.name + " " + employee.surname
                        }
                        style={{
                          ...getStatusClass(employee.status),
                        }}
                      />
                    ))}
                  </div>
                  {invisibleEmployees.length > 0 && (
                    <div className="mt-auto flex justify-center">
                      <Popover
                        open={popoverDay === day && Boolean(popoverAnchor)}
                        onOpenChange={handleClosePopover}
                        content={
                          <div className="grid grid-cols-2 gap-1 p-1">
                            {invisibleEmployees.map((employee) => (
                              <UserLabel
                                key={employee.id}
                                type="person"
                                avatar={{
                                  icon: getStatusIcon(employee.status),
                                }}
                                size="m"
                                description={employee.name}
                                text={employee.name + " " + employee.surname}
                                style={{
                                  ...getStatusClass(employee.status),
                                }}
                              />
                            ))}
                          </div>
                        }
                      >
                        <Button
                          view="flat"
                          size="m"
                          onClick={(e) => isMobile ? null : handleOpenPopover(e, day)}
                        >
                          +{invisibleEmployees.length}
                        </Button>
                      </Popover>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Пустые ячейки в конце */}
            {Array.from({ length: endDay }).map((_, index) => (
              <div
                key={`empty-end-${index}`}
                className="p-2 sm:p-4 border rounded-lg text-center dark:border-gray-600 opacity-50"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Sheet для мобильной версии */}
      <DaySheet
        day={selectedDay || 0}
        month={currentDate.getMonth()}
        year={currentDate.getFullYear()}
        employeesInDay={selectedDay !== null
          ? currentMonthEmployees.filter((employee) =>
              isEmployeeInDay(employee, selectedDay, currentDate.getMonth(), currentDate.getFullYear())
            )
          : []}
        visible={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </div>
  );
}