import { IPeriod } from "@/app/types/system/i-period";
import { getDatePeriod } from "@/app/utils/getDatePeriod";
import { getPeriodButtonText } from "@/app/utils/getPeriodButtonText";
import { RangeCalendar } from "@gravity-ui/date-components";
import { dateTime, dateTimeParse } from "@gravity-ui/date-utils";
import { Calendar } from "@gravity-ui/icons";
import { Button, Icon, Popover, Text } from "@gravity-ui/uikit";
import { SetStateAction } from "react";

interface PeriodSelectorProps {
  isPopoverOpen: boolean;
  selectedPeriod: IPeriod;
  setIsPopoverOpen: (value: SetStateAction<boolean>) => void;
  handlePeriodChange: (period: IPeriod) => void;
}

export const PeriodSelector = ({
  isPopoverOpen,
  selectedPeriod,
  setIsPopoverOpen,
  handlePeriodChange,
}: PeriodSelectorProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => setIsPopoverOpen(open)}
        content={
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <Button
                view="flat"
                onClick={() =>
                  handlePeriodChange({
                    start: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    ),
                    end: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate(),
                      23,
                      59,
                      59,
                      999
                    ),
                  })
                }
              >
                Текущий день
              </Button>
              <Button
                view="flat"
                onClick={() =>
                  handlePeriodChange({
                    start: new Date(
                      new Date().setDate(
                        new Date().getDate() - new Date().getDay()
                      )
                    ),
                    end: new Date(
                      new Date().setDate(
                        new Date().getDate() + (6 - new Date().getDay())
                      )
                    ),
                  })
                }
              >
                Текущая неделя
              </Button>
              <Button
                view="flat"
                onClick={() =>
                  handlePeriodChange({
                    start: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ),
                    end: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                      0
                    ),
                  })
                }
              >
                Текущий месяц
              </Button>
              <Button
                view="flat"
                onClick={() =>
                  handlePeriodChange({
                    start: new Date(new Date().getFullYear(), 0, 1),
                    end: new Date(new Date().getFullYear(), 11, 31),
                  })
                }
              >
                Текущий год
              </Button>
              <Button
                view="flat"
                onClick={() =>
                  handlePeriodChange({
                    start: new Date(0),
                    end: new Date(new Date().getFullYear(), 11, 31),
                  })
                }
              >
                Все
              </Button>
              <RangeCalendar
                value={{
                  start: dateTime({ input: selectedPeriod.start }),
                  end: dateTime({ input: selectedPeriod.end }),
                }}
                maxValue={dateTime({
                  input: new Date(new Date().getFullYear(), 11, 31),
                })}
                onUpdate={(value) =>
                  handlePeriodChange({
                    start: dateTimeParse(value.start)?.toDate() || new Date(),
                    end:
                      dateTimeParse(value.end)?.toDate() ||
                      dateTimeParse(value.start)?.toDate() ||
                      new Date(),
                  })
                }
              />
            </div>
          </div>
        }
      >
        <Button>
          <Icon data={Calendar} />
          {getPeriodButtonText(selectedPeriod)}
        </Button>
      </Popover>

      {/* Отображение выбранного периода */}
      <Text variant="subheader-2">
        {getPeriodButtonText(selectedPeriod) !== "Все" &&
          getDatePeriod(selectedPeriod)}
      </Text>
    </div>
  );
};
