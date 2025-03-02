import { DEFAULT_MONTH_NAMES } from "@/app/consts/calendar";
import { CurrentDate } from "@/app/store/slices/calendarSlice";
import { ArrowLeft, ArrowRight, ArrowUturnCcwLeft } from "@gravity-ui/icons";
import { Button, Icon, Text } from "@gravity-ui/uikit";
import { useMemo } from "react";

interface CalendarHeaderProps {
  currentDate: CurrentDate;
  handleToday: () => void;
  handleSwitchMonth: (isPrev: boolean) => void;
}
export const CalendarHeader = ({
  currentDate,
  handleToday,
  handleSwitchMonth,
}: CalendarHeaderProps) => {
  const isCurrentMonth = useMemo(() => {
    const now = new Date();

    return (
      currentDate.month === now.getMonth() &&
      currentDate.year === now.getFullYear()
    );
  }, [currentDate]);

  return (
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
          {DEFAULT_MONTH_NAMES[currentDate.month]} {currentDate.year}
        </Text>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleToday}
          view={isCurrentMonth ? "outlined" : "normal"}
          disabled={isCurrentMonth}
          size="l"
          title={"Вернуться к текущему"}
          className="sm:size-xl w-12 flex justify-center items-center"
        >
          <Icon data={ArrowUturnCcwLeft} size={18} />
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
  );
};
