"use client";
import { Calendar, RangeCalendar } from "@gravity-ui/date-components";
import { dateTime, dateTimeParse } from "@gravity-ui/date-utils";
import { Plus } from "@gravity-ui/icons";
import { Button, Checkbox, Icon, Modal, Text } from "@gravity-ui/uikit";
import { useState } from "react";
import { DICT_STATUS } from "../consts/journal";
import { IIncidentStatus } from "../types/common/i-incident";

export default function IncidentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPeriod, setIsPeriod] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IIncidentStatus | null>(
    null
  );
  const [errors, setErrors] = useState<{ date: boolean; status: boolean }>({
    date: false,
    status: false,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPeriod(false);
    setSelectedDate(null);
    setSelectedRange(null);
    setSelectedStatus(null);
    setErrors({ date: false, status: false });
  };

  const handleSubmit = () => {
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

    const newIncident = {
      id: Date.now(),
      userId: 1,
      name: "Иван",
      surname: "Иванов",
      status: selectedStatus!,
      date: isPeriod ? selectedRange! : selectedDate!,
    };

    console.log("Новая запись:", newIncident);
    handleCloseModal();
  };

  return (
    <div className="fixed bottom-8 right-3 z-50 sm:right-8 sm:bottom-8">
      {/* Кнопка добавления записи */}
      <Button view="action" size="xl" onClick={handleOpenModal}>
        <Icon data={Plus} />
      </Button>

      {/* Модальное окно */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="p-3 w-[90vw] max-w-[400px] flex flex-col gap-4">
          {/* Заголовок */}
          <Text variant="header-2" className="text-center">
            Новая запись
          </Text>

          {/* Календарь или RangeCalendar */}
          <div className="flex justify-center">
            {isPeriod ? (
              <RangeCalendar
                value={{
                  start: selectedRange
                    ? dateTime({ input: selectedRange.start })
                    : dateTime({ input: new Date() }),
                  end: selectedRange
                    ? dateTime({ input: selectedRange.end })
                    : dateTime({ input: new Date() }),
                }}
                onUpdate={(value) =>
                  setSelectedRange({
                    start: dateTimeParse(value.start)?.toDate() || new Date(),
                    end:
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
            <Button onClick={handleSubmit} view="action">
              Подтвердить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
