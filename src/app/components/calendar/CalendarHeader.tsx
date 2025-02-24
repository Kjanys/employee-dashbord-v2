import { DEFAULT_MONTH_NAMES } from "@/app/consts/calendar";
import { Button, Icon, Text } from "@gravity-ui/uikit";
import { ArrowLeft, ArrowRight, ArrowsRotateLeft } from "@gravity-ui/icons";
import { useMemo } from "react";

interface CalendarHeaderProps {
  currentDate: Date;
  handleToday: () => void;
  handleSwitchMonth: (isPrev: boolean) => void;
}
export const CalendarHeader = ({
  currentDate,
  handleToday,
  handleSwitchMonth,
}: CalendarHeaderProps) => {
  const isCurrentMonth = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const now = new Date();

    return currentMonth === now.getMonth() && currentYear === now.getFullYear();
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
          {DEFAULT_MONTH_NAMES[currentDate.getMonth()]}{" "}
          {currentDate.getFullYear()}
        </Text>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleToday}
          view={isCurrentMonth ? "outlined" : "normal"}
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
  );
};
