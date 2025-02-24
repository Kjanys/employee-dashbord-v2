"use client";
import { Card } from "@gravity-ui/uikit";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { CALENDAR_VARIANTS } from "../../consts/calendar";
import { RootState } from "../../store/store";
import { CalendarDirections } from "../../types/system/i-calendar";
import { isEmployeeInDay } from "../../utils/getIsEmployeeInDay";
import DaySheet from "../DaySheet";
import { CalendarHeader } from "./CalendarHeader";
import { Cells } from "./Cells";
import { EptyCells } from "./EptyCells";
import { WeekDays } from "./WeekDays";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number>(0);
  const [startDay, setStartDay] = useState<number>(0);
  const [endDay, setEndDay] = useState<number>(0);
  const [direction, setDirection] = useState<CalendarDirections>(
    CalendarDirections.RIGHT
  );
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverDay, setPopoverDay] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { currentMonthEmployees } = useSelector(
    (state: RootState) => state.calendar
  );

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // 640px — breakpoint для мобильных устройств
    };

    handleResize(); // Проверяем при загрузке
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработчик нажатия клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleSwitchMonth(true);
      } else if (event.key === "ArrowRight") {
        handleSwitchMonth(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentDate]);

  // Обработчик свайпов
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwitchMonth(false),
    onSwipedRight: () => handleSwitchMonth(true),
    trackMouse: true,
  });

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

  const handleOpenPopover = (
    event: React.MouseEvent<HTMLElement>,
    day: number
  ) => {
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
    <div className="h-full overflow-hidden" {...handlers}>
      <Card className="p-4 dark:bg-gray-700 flex flex-col h-full">
        {/* Шапка с кнопками и названием месяца */}
        <CalendarHeader
          currentDate={currentDate}
          handleToday={handleToday}
          handleSwitchMonth={handleSwitchMonth}
        />

        {/* Дни недели */}
        <WeekDays />

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
            <EptyCells daysNumber={startDay} />

            {/* Дни месяца */}
            <Cells
              daysInMonth={daysInMonth}
              currentMonthEmployees={currentMonthEmployees}
              currentDate={currentDate}
              isMobile={isMobile}
              popoverDay={popoverDay}
              popoverAnchor={popoverAnchor}
              handleDayClick={handleDayClick}
              handleClosePopover={handleClosePopover}
              handleOpenPopover={handleOpenPopover}
            />

            {/* Пустые ячейки в конце */}
            <EptyCells daysNumber={endDay} />
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Sheet для мобильной версии */}
      <DaySheet
        day={selectedDay || 0}
        month={currentDate.getMonth()}
        year={currentDate.getFullYear()}
        employeesInDay={
          selectedDay !== null
            ? currentMonthEmployees.filter((employee) =>
                isEmployeeInDay(
                  employee,
                  selectedDay,
                  currentDate.getMonth(),
                  currentDate.getFullYear()
                )
              )
            : []
        }
        visible={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </div>
  );
}
