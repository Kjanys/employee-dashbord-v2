"use client";
import { socket } from "@/socket";
import { Plus } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toaster } from "../providers";
import { useCreateIncidentMutation } from "../store/api/api-incidents";
import { RootState } from "../store/store";
import { IIncident } from "../types/common/i-incident";
import IcidentModal from "./IcidentModal";

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
      const result = await createIncident(newIncident).unwrap();

      if (result) {
        socket.emit("incidentAdded", result.incident);
        setIsModalOpen(false);
      }
    } catch (err) {
      toaster.add({
        title: "Ошибка при добавлении события",
        name: "getNewError",
        theme: "danger",
        isClosable: true,
        content: err.message,
      });
      console.error("Ошибка при добавлении события:", err);
    }
  };

  useEffect(() => {
    if (!error) return;

    toaster.add({
      title: "Ошибка при добавлении события",
      name: "getNewError",
      theme: "danger",
      isClosable: true,
      content: error.message,
    });
  }, [error]);

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
        isLoading={isLoading}
      />
    </div>
  );
}
