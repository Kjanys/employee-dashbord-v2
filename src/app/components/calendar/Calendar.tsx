"use client";
import {
  CurrentDate,
  fetchIncidents,
  setCurrentDate,
} from "@/app/store/slices/calendarSlice";
import { Card } from "@gravity-ui/uikit";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { CALEDAR_STOK_VALUE, CALENDAR_VARIANTS } from "../../consts/calendar";
import { RootState } from "../../store/store";
import { CalendarDirections } from "../../types/system/i-calendar";
import { isEmployeeInDay } from "../../utils/getIsEmployeeInDay";
import DaySheet from "../DaySheet";
import { CalendarHeader } from "./CalendarHeader";
import { Cells } from "./Cells";
import { EptyCells } from "./EptyCells";
import { WeekDays } from "./WeekDays";

export default function Calendar() {
  const dispatch = useDispatch();
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
  const [cellHeight, setCellHeight] = useState<number>(0); // Высота ячейки
  const [windowHeight, setWindowHeight] = useState<number>();
  const { currentMonthIncidents } = useSelector(
    (state: RootState) => state.calendar
  );
  const { currentDate } = useSelector((state: RootState) => state.calendar);
  console.log("currentMonthIncidents", currentMonthIncidents);
  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // 640px — breakpoint для мобильных устройств
    };

    handleResize(); // Проверяем при загрузке
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
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
    return () => window?.removeEventListener("keydown", handleKeyDown);
  }, [currentDate]);

  // Обработчик свайпов
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwitchMonth(false),
    onSwipedRight: () => handleSwitchMonth(true),
    trackMouse: true,
  });

  // Обновление календаря
  const updateCalendar = (date: CurrentDate) => {
    const daysInMonth = new Date(date.year, date.month + 1, 0).getDate();
    setDaysInMonth(daysInMonth);

    const startDay = new Date(date.year, date.month, 1).getDay();
    setStartDay(startDay === 0 ? 6 : startDay - 1);

    const endDay = new Date(date.year, date.month + 1, 0).getDay();
    setEndDay(endDay === 0 ? 0 : 7 - endDay);

    // Рассчитываем количество строк в календаре
    const totalDays =
      daysInMonth +
      (startDay === 0 ? 6 : startDay - 1) +
      (endDay ? 7 - endDay : 0);

    const rows = Math.ceil(totalDays / 7);

    // Рассчитываем высоту ячейки
    const calendar = document.getElementById("calendar-cells");
    const calendarHeight = calendar?.getBoundingClientRect().height;
    const computedStyles = window?.getComputedStyle(calendar!);
    const gapInRem = parseFloat(computedStyles.getPropertyValue("gap"));
    const baseFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const gapInPixels = gapInRem * baseFontSize;

    const cellHeight =
      (calendarHeight || 0) / rows - gapInPixels / (rows * 3.5);

    setCellHeight(cellHeight);
  };

  const handleSwitchMonth = (isPrev: boolean) => {
    dispatch(
      setCurrentDate({
        ...currentDate,
        month: currentDate.month + (isPrev ? -1 : 1),
      })
    );
    dispatch(
      fetchIncidents({
        ...currentDate,
        month: currentDate.month + (isPrev ? -1 : 1),
      })
    );
    setDirection(isPrev ? CalendarDirections.LEFT : CalendarDirections.RIGHT);
  };

  const handleToday = () => {
    dispatch(setCurrentDate(CALEDAR_STOK_VALUE));
    dispatch(fetchIncidents(CALEDAR_STOK_VALUE));
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
  }, [currentDate, windowHeight]);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window?.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full overflow-hidden" {...handlers}>
      <Card className="p-4 flex flex-col h-full">
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
            key={currentDate.month}
            custom={direction}
            variants={CALENDAR_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            id="calendar-cells"
            className="grid grid-cols-7 gap-1 sm:gap-2 flex-1 overflow-hidden"
            style={{ gridAutoRows: cellHeight }} // Динамическая высота строк
          >
            {/* Пустые ячейки в начале */}
            <EptyCells daysNumber={startDay} />

            {/* Дни месяца */}
            <Cells
              daysInMonth={daysInMonth}
              currentMonthEmployees={currentMonthIncidents}
              currentDate={currentDate}
              isMobile={isMobile}
              popoverDay={popoverDay}
              popoverAnchor={popoverAnchor}
              handleDayClick={handleDayClick}
              handleClosePopover={handleClosePopover}
              handleOpenPopover={handleOpenPopover}
              cellHeight={cellHeight} // Передаем высоту ячейки
            />

            {/* Пустые ячейки в конце */}
            <EptyCells daysNumber={endDay} />
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Sheet для мобильной версии */}
      <DaySheet
        day={selectedDay || 0}
        month={currentDate.month}
        year={currentDate.year}
        employeesInDay={
          selectedDay !== null
            ? currentMonthIncidents.filter((employee) =>
                isEmployeeInDay(
                  employee,
                  selectedDay,
                  currentDate.month,
                  currentDate.year
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
