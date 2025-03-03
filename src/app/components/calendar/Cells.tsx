import { CurrentDate } from "@/app/store/slices/calendarSlice";
import { IIncident } from "@/app/types/common/i-incident";
import { getInitials } from "@/app/utils/getInitials";
import { isEmployeeInDay } from "@/app/utils/getIsEmployeeInDay";
import { getStatusClass } from "@/app/utils/getStatusClass";
import { getStatusIcon } from "@/app/utils/getStatusIcon";
import { Card, UserLabel } from "@gravity-ui/uikit";
import { JSX, useEffect, useState } from "react";
import { CalendarPopover } from "./CalendarPopover";

interface CellsProps {
  daysInMonth: number;
  currentMonthEmployees: IIncident[];
  currentDate: CurrentDate;
  isMobile: boolean;
  popoverDay: number | null;
  popoverAnchor: HTMLElement | null;
  handleDayClick: (day: number) => void;
  handleClosePopover: () => void;
  handleOpenPopover: (
    event: React.MouseEvent<HTMLElement>,
    day: number
  ) => void;
  cellHeight: number; // Высота ячейки
}

const EMPLOYEE_HEIGHT = 32;
const NUMBER_HEIGHT = 25;

export const Cells = ({
  daysInMonth,
  currentMonthEmployees,
  currentDate,
  isMobile,
  popoverDay,
  popoverAnchor,
  handleDayClick,
  handleClosePopover,
  handleOpenPopover,
  cellHeight,
}: CellsProps): JSX.Element[] => {
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [maxVisibleEmployees, setMaxVisibleEmployees] = useState(3);

  // Рассчитываем максимальное количество записей, которые могут поместиться в ячейку
  useEffect(() => {
    const maxEmployees =
      Math.floor((cellHeight - NUMBER_HEIGHT * 2) / EMPLOYEE_HEIGHT) *
      (isMobile ? 1 : 2);
    console.log("maxEmployees", maxEmployees);
    setMaxVisibleEmployees(maxEmployees);
  }, [cellHeight]);

  return days.map((day) => {
    const employeesInDay = currentMonthEmployees.filter((employee) =>
      isEmployeeInDay(employee, day, currentDate.month, currentDate.year)
    );

    // На мобильных устройствах показываем только одну колонку
    const showTwoColumns =
      !isMobile &&
      cellHeight - NUMBER_HEIGHT * 2 < employeesInDay.length * EMPLOYEE_HEIGHT;
    const visibleEmployees = employeesInDay.slice(0, maxVisibleEmployees);
    const invisibleEmployees = employeesInDay.slice(maxVisibleEmployees);

    return (
      <div
        key={day}
        className="p-1 sm:p-2 border rounded-lg text-center hover:bg-[var(--g-color-private-blue-100)] cursor-pointer border-[var(--g-color-private-blue-500)] flex flex-col justify-start"
        style={{ height: cellHeight }}
        onClick={() => handleDayClick(day)}
      >
        <div className="text-sm font-semibold mb-2">{day}</div>
        <div
          className={`grid ${
            showTwoColumns ? "grid-cols-2" : "grid-cols-1"
          } gap-1 overflow-hidden`}
        >
          {visibleEmployees.map((employee) => (
            <div
              key={employee.id}
              title={employee.name + " " + employee.surname}
            >
              {!isMobile ? (
                <UserLabel
                  type={isMobile ? "empty" : "person"}
                  avatar={{
                    icon: getStatusIcon(employee.status),
                  }}
                  size={isMobile ? "xs" : "s"}
                  description={employee.name}
                  text={
                    isMobile
                      ? getInitials(employee.name, employee.surname) // Инициалы на мобильных устройствах
                      : showTwoColumns &&
                        (employee.name + " " + employee.surname).length > 10
                      ? `${(employee.name + " " + employee.surname).slice(
                          0,
                          10
                        )}...`
                      : employee.name + " " + employee.surname
                  }
                  style={{
                    ...getStatusClass(employee.status),
                  }}
                />
              ) : (
                <Card
                  style={{
                    padding: "1px",
                    ...getStatusClass(employee.status),
                  }}
                >
                  {getInitials(employee.name, employee.surname)}
                </Card>
              )}
            </div>
          ))}
        </div>
        {invisibleEmployees.length > 0 && (
          <CalendarPopover
            popoverDay={popoverDay}
            day={day}
            invisibleEmployees={invisibleEmployees}
            isMobile={isMobile}
            popoverAnchor={popoverAnchor}
            handleClosePopover={handleClosePopover}
            handleOpenPopover={handleOpenPopover}
          />
        )}
      </div>
    );
  });
};
