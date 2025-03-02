"use client";
import {
  DEFAULT_JOURNAL_PERIOD,
  DEFAULT_SELECTED_STATUS,
} from "@/app/consts/journal";
import { IPeriod } from "@/app/types/system/i-period";
import { Button, Modal, Text } from "@gravity-ui/uikit";
import { useState } from "react";
import { IIncidentStatus } from "../../../types/common/i-incident";
import { JournalList } from "./JournalList";
import { PeriodSelector } from "./PeriodSelector";
import { StatusFilterButtons } from "./StatusFilterButtons";

interface JournalModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function JournalModal({
  isModalOpen,
  setIsModalOpen,
}: JournalModalProps) {
  const [sortDesc, setSortDesc] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<IPeriod>(
    DEFAULT_JOURNAL_PERIOD
  );

  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<IIncidentStatus, boolean>
  >(DEFAULT_SELECTED_STATUS);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Обработчик выбора периода
  const handlePeriodChange = (period: IPeriod) => {
    console.log("period", period);
    setSelectedPeriod(period);
    setIsPopoverOpen(false);
  };

  // Обработчик изменения статуса
  const toggleStatus = (status: IIncidentStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="p-4 w-[90vw] max-w-[800px] h-[80vh] flex flex-col">
        {/* Шапка журнала */}
        <Text variant="header-2" className="mb-4">
          Журнал записей
        </Text>

        {/* Выбор периода */}
        <PeriodSelector
          isPopoverOpen={isPopoverOpen}
          selectedPeriod={selectedPeriod}
          setIsPopoverOpen={setIsPopoverOpen}
          handlePeriodChange={handlePeriodChange}
          setSortDesc={setSortDesc}
          sortDesc={sortDesc}
        />

        {/* Кнопки фильтрации по статусу */}
        <StatusFilterButtons
          selectedStatuses={selectedStatuses}
          toggleStatus={toggleStatus}
        />

        {/* Список событий с прокруткой */}
        <JournalList
          sortDesc={sortDesc}
          handleCloseModal={handleCloseModal}
          selectedPeriod={selectedPeriod}
          selectedStatuses={selectedStatuses}
        />

        {/* Кнопка закрытия */}
        <div className="mt-4 flex justify-end">
          <Button onClick={handleCloseModal} view="normal">
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
}
