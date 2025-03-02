"use client";
import { Plus } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IIncident } from "../types/common/i-incident";
import IcidentModal from "./IcidentModal";
import { useCreateIncidentMutation } from "../store/api/api-incidents"; // Импортируем новый API
import { socket } from "@/socket";

export default function AddIncidentButton() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Хук для создания события
  const [createIncident, { isLoading, error }] = useCreateIncidentMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (newIncident: IIncident) => {
    try {
      // Отправляем запрос на создание события
      console.log("newIncident", newIncident);
      const result = await createIncident(newIncident).unwrap();
      console.log("result", result);
      // Если запрос успешен, отправляем обновление через WebSocket
      if (result) {
        console.log("Фронт отдает: newIncident", newIncident);
        socket.emit("incidentAdded", result.incident);
        setIsModalOpen(false); // Закрываем модальное окно
      }
    } catch (err) {
      console.error("Ошибка при добавлении события:", err);
    }
  };

  return (
    <div className="fixed bottom-8 right-3 z-50 sm:right-8 sm:bottom-8">
      {/* Кнопка добавления записи */}
      {isAuthenticated && (
        <Button view="action" size="xl" onClick={handleOpenModal}>
          <Icon data={Plus} />
        </Button>
      )}

      {/* Модальное окно */}
      <IcidentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
        title={"Новая запись"}
        isLoading={isLoading} // Передаем состояние загрузки в модальное окно
      />
    </div>
  );
}
