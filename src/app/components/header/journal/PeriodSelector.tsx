import { IPeriod } from "@/app/types/system/i-period";
import { getDatePeriod } from "@/app/utils/getDatePeriod";
import { getPeriodButtonText } from "@/app/utils/getPeriodButtonText";
import { RangeCalendar } from "@gravity-ui/date-components";
import { dateTime, dateTimeParse } from "@gravity-ui/date-utils";
import {
  BarsAscendingAlignLeftArrowDown,
  BarsAscendingAlignLeftArrowUp,
  Calendar,
} from "@gravity-ui/icons";
import { Button, Icon, Popover, Text } from "@gravity-ui/uikit";
import { Dispatch, SetStateAction } from "react";

interface PeriodSelectorProps {
  setSortDesc: Dispatch<SetStateAction<boolean>>;
  isPopoverOpen: boolean;
  selectedPeriod: IPeriod;
  setIsPopoverOpen: (value: SetStateAction<boolean>) => void;
  handlePeriodChange: (period: IPeriod) => void;
  sortDesc: boolean;
}

export const PeriodSelector = ({
  setSortDesc,
  isPopoverOpen,
  selectedPeriod,
  setIsPopoverOpen,
  handlePeriodChange,
  sortDesc,
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
                    startDate: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    ),
                    endDate: new Date(
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
                    startDate: new Date(
                      new Date().setDate(
                        new Date().getDate() -
                          new Date().getDay() +
                          (new Date().getDay() === 0 ? -6 : 1)
                      )
                    ),
                    endDate: new Date(
                      new Date().setDate(
                        new Date().getDate() -
                          new Date().getDay() +
                          (new Date().getDay() === 0 ? 0 : 7)
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
                    startDate: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ),
                    endDate: new Date(
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
                    startDate: new Date(new Date().getFullYear(), 0, 1),
                    endDate: new Date(new Date().getFullYear(), 11, 31),
                  })
                }
              >
                Текущий год
              </Button>
              <Button
                view="flat"
                onClick={() =>
                  handlePeriodChange({
                    startDate: new Date(0),
                    endDate: new Date(new Date().getFullYear(), 11, 31),
                  })
                }
              >
                Все
              </Button>
              <RangeCalendar
                value={{
                  start: dateTime({ input: selectedPeriod.startDate }),
                  end: dateTime({ input: selectedPeriod.endDate }),
                }}
                maxValue={dateTime({
                  input: new Date(new Date().getFullYear(), 11, 31),
                })}
                onUpdate={(value) =>
                  handlePeriodChange({
                    startDate:
                      dateTimeParse(value.start)?.toDate() || new Date(),
                    endDate:
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

      <Button
        onClick={() => {
          setSortDesc(!sortDesc);
        }}
      >
        <Icon
          data={
            sortDesc
              ? BarsAscendingAlignLeftArrowDown
              : BarsAscendingAlignLeftArrowUp
          }
        />
      </Button>
    </div>
  );
};
