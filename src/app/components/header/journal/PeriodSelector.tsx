import { DICT_PERIODNAMES } from "@/app/consts/journal";
import { PeriodName } from "@/app/types/common/i-incident";
import { IPeriod } from "@/app/types/system/i-period";
import { getDatePeriod } from "@/app/utils/getDatePeriod";
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
  selectedPeriod: IPeriod | null;
  curPeriodName: PeriodName;
  setIsPopoverOpen: (value: SetStateAction<boolean>) => void;
  handlePeriodChange: (periodName: PeriodName, period?: IPeriod) => void;
  sortDesc: boolean;
}

export const PeriodSelector = ({
  setSortDesc,
  isPopoverOpen,
  selectedPeriod,
  curPeriodName,
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
              {Object.keys(DICT_PERIODNAMES).map((key) => {
                if (key === PeriodName.PERIOD) {
                  return (
                    <RangeCalendar
                      key={key}
                      value={{
                        start: dateTime({ input: selectedPeriod?.startDate }),
                        end: dateTime({ input: selectedPeriod?.endDate }),
                      }}
                      maxValue={dateTime({
                        input: new Date(new Date().getFullYear(), 11, 31),
                      })}
                      onUpdate={(value) =>
                        handlePeriodChange(key as PeriodName, {
                          startDate:
                            dateTimeParse(value.start)?.toDate() || new Date(),
                          endDate:
                            dateTimeParse(value.end)?.toDate() ||
                            dateTimeParse(value.start)?.toDate() ||
                            new Date(),
                        })
                      }
                    />
                  );
                }
                return (
                  <Button
                    key={key}
                    view="flat"
                    onClick={() => handlePeriodChange(key as PeriodName)}
                  >
                    {DICT_PERIODNAMES[key as PeriodName]}
                  </Button>
                );
              })}
            </div>
          </div>
        }
      >
        <Button>
          <Icon data={Calendar} />
          {DICT_PERIODNAMES[curPeriodName]}
        </Button>
      </Popover>

      {/* Отображение выбранного периода */}
      <Text variant="subheader-2">
        {curPeriodName === PeriodName.ALL
          ? "Показаны все записи"
          : getDatePeriod(selectedPeriod)}
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
