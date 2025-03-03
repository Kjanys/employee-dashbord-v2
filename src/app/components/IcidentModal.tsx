/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { Calendar, RangeCalendar } from "@gravity-ui/date-components";
import { dateTime, dateTimeParse } from "@gravity-ui/date-utils";
import { Button, Checkbox, Modal, Text } from "@gravity-ui/uikit";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DICT_STATUS } from "../consts/journal";
import { RootState } from "../store/store";
import { IIncident, IIncidentStatus } from "../types/common/i-incident";
import { IError } from "../types/system/i-eror";
import { IPeriod } from "../types/system/i-period";

interface IcidentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
  handleSubmit: (incident: IIncident) => void;
  title: string;
  isLoading?: boolean;
  initialData?: IIncident | null;
}

export default function IcidentModal({
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  title,
  isLoading,
  initialData,
}: IcidentModalProps) {
  const [isPeriod, setIsPeriod] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedRange, setSelectedRange] = useState<IPeriod | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IIncidentStatus | null>(
    null
  );
  const [errors, setErrors] = useState<IError>({
    date: false,
    status: false,
  });

  const { user } = useSelector((state: RootState) => state.user);

  // Инициализация состояния при открытии модального окна
  useEffect(() => {
    if (initialData) {
      setIsPeriod(!initialData.isPeriod ? false : true);
      setSelectedDate(!initialData.isPeriod ? initialData.date : null);
      setSelectedRange(
        !initialData.isPeriod
          ? null
          : {
              startDate: initialData.startDate!,
              endDate: initialData.endDate!,
            }
      );
      setSelectedStatus(initialData.status);
    } else {
      setIsPeriod(false);
      setSelectedDate(new Date());
      setSelectedRange(null);
      setSelectedStatus(null);
    }
  }, [initialData]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPeriod(false);
    setSelectedDate(null);
    setSelectedRange(null);
    setSelectedStatus(null);
    setErrors({ date: false, status: false });
  };

  const submit = () => {
    // Валидация
    const isDateValid = isPeriod
      ? selectedRange !== null
      : selectedDate !== null;
    const isStatusValid = selectedStatus !== null;

    if (!isDateValid || !isStatusValid) {
      setErrors({
        date: !isDateValid,
        status: !isStatusValid,
      });
      return;
    }

    const newIncident: IIncident = {
      id: initialData?.id || Date.now(),
      userId: 1,
      name: user!.name,
      surname: user!.surname,
      status: selectedStatus!,
      date: isPeriod ? null : selectedDate!,
      isPeriod: isPeriod,
      startDate: isPeriod ? selectedRange?.startDate! : null,
      endDate: isPeriod ? selectedRange?.endDate! : null,
    };

    handleSubmit(newIncident);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="p-3 w-[90vw] max-w-[400px] flex flex-col gap-4">
        {/* Заголовок */}
        <Text variant="header-2" className="text-center">
          {title}
        </Text>

        {/* Календарь или RangeCalendar */}
        <div className="flex justify-center">
          {isPeriod ? (
            <RangeCalendar
              value={{
                start: selectedRange
                  ? dateTime({ input: selectedRange.startDate })
                  : dateTime({ input: new Date() }),
                end: selectedRange
                  ? dateTime({ input: selectedRange.endDate })
                  : dateTime({ input: new Date() }),
              }}
              onUpdate={(value) =>
                setSelectedRange({
                  startDate: dateTimeParse(value.start)?.toDate() || new Date(),
                  endDate:
                    dateTimeParse(value.end)?.toDate() ||
                    dateTimeParse(value.start)?.toDate() ||
                    new Date(),
                })
              }
              className="text-center"
            />
          ) : (
            <Calendar
              value={dateTime({ input: selectedDate })}
              onUpdate={(value) =>
                setSelectedDate(dateTimeParse(value)?.toDate() || null)
              }
              className="text-center"
            />
          )}
        </div>

        {/* Сообщение об ошибке для даты */}
        {errors.date && (
          <Text color="danger" className="text-center">
            Выберите дату или период.
          </Text>
        )}

        {/* Кнопки для выбора статуса */}
        <Text variant="subheader-2" className="text-center">
          Тип события
        </Text>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(DICT_STATUS).map(([status, { name, color }]) => (
            <Button
              key={status}
              view={selectedStatus === status ? "normal" : "outlined"}
              style={{
                backgroundColor:
                  selectedStatus === status ? `var(${color})` : undefined,
              }}
              onClick={() => setSelectedStatus(status as IIncidentStatus)}
            >
              {name}
            </Button>
          ))}
        </div>

        {/* Сообщение об ошибке для статуса */}
        {errors.status && (
          <Text color="danger" className="text-center">
            Выберите тип события.
          </Text>
        )}

        {/* Кнопка подтверждения */}
        <div className="flex justify-between">
          {/* Checkbox для выбора периода */}
          <Checkbox
            checked={isPeriod}
            onChange={() => setIsPeriod(!isPeriod)}
            size="l"
            className="mt-1"
          >
            Период
          </Checkbox>
          <Button onClick={submit} view="action" loading={isLoading}>
            Подтвердить
          </Button>
        </div>
      </div>
    </Modal>
  );
}
