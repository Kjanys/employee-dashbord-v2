"use client";
import { Plus } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { useState } from "react";
import { IIncident } from "../types/common/i-incident";
import IcidentModal from "./IcidentModal";

export default function AddIncidentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (newIncident: IIncident) => {
    console.log("Новая запись:", newIncident);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-3 z-50 sm:right-8 sm:bottom-8">
      {/* Кнопка добавления записи */}
      <Button view="action" size="xl" onClick={handleOpenModal}>
        <Icon data={Plus} />
      </Button>

      {/* Модальное окно */}
      <IcidentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
        title={"Новая запись"}
      />
    </div>
  );
}
