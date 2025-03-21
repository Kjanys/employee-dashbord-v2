/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toaster } from "@/app/providers";
import {
  useDeleteIncidentMutation,
  useFetchIncidentsQuery,
  useUpdateIncidentMutation,
} from "@/app/store/api/api-incidents"; // Импортируем новые хуки
import { setIncidents } from "@/app/store/slices/userJournalSlice";
import { RootState } from "@/app/store/store";
import {
  IIncident,
  IIncidentStatus,
  PeriodName,
} from "@/app/types/common/i-incident";
import { IPeriod } from "@/app/types/system/i-period";
import { formatDate } from "@/app/utils/formatDate";
import { getStatusClass } from "@/app/utils/getStatusClass";
import { getStatusIcon } from "@/app/utils/getStatusIcon";
import { sortIncidents } from "@/app/utils/sortIncidents";
import { socket } from "@/socket";
import { Pencil, Xmark } from "@gravity-ui/icons";
import { Button, Icon, Modal, Text, UserLabel } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IcidentModal from "../../IcidentModal";

interface JournalListProps {
  handleCloseModal: () => void;
  sortDesc: boolean;
  selectedPeriod: IPeriod | null;
  curPeriodName: PeriodName;
  selectedStatuses: Record<IIncidentStatus, boolean>;
}

export const JournalList = ({
  handleCloseModal,
  sortDesc,
  selectedPeriod,
  curPeriodName,
  selectedStatuses,
}: JournalListProps) => {
  const { incidents } = useSelector((state: RootState) => state.userJournal);
  const { user } = useSelector((state: RootState) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState<IIncident | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingIncidentId, setDeletingIncidentId] = useState<number | null>(
    null
  );
  const dispatch = useDispatch();

  // Получаем список статусов, которые выбраны
  const activeStatuses = Object.entries(selectedStatuses)
    .filter(([_, isSelected]) => isSelected)
    .map(([status]) => status as IIncidentStatus);

  // Используем хук для получения событий
  const { data, error, isLoading } = useFetchIncidentsQuery({
    userId: user ? user.id : 1,
    periodName: curPeriodName,
    startDate:
      selectedPeriod && curPeriodName === PeriodName.PERIOD
        ? new Date(selectedPeriod.startDate.setHours(0, 0, 0, 0))
        : null,
    endDate:
      selectedPeriod && curPeriodName === PeriodName.PERIOD
        ? new Date(selectedPeriod.endDate.setHours(23, 59, 59, 59))
        : null,
    statuses: activeStatuses,
  });

  useEffect(() => {
    if (!error) return;

    toaster.add({
      title: "Ошибка при загрузке событий журнала",
      name: "getJournalError",
      theme: "danger",
      isClosable: true,
      content: (error as any).message,
    });
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(setIncidents(data));
    }
  }, [data, dispatch]);

  // Хуки для обновления и удаления событий
  const [updateIncident] = useUpdateIncidentMutation();
  const [deleteIncident] = useDeleteIncidentMutation();

  const handleEdit = (incident: IIncident) => {
    setEditingIncident(incident);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (updatedIncident: IIncident) => {
    try {
      const result = await updateIncident(updatedIncident).unwrap();

      if (result) {
        socket.emit("incidentUpdated", result.incident);

        toaster.add({
          title: "Событие",
          name: "getUpdateError",
          theme: "success",
          isClosable: true,
          content: "Событие изменено успешно",
        });

        setIsEditModalOpen(false);
        handleCloseModal();
      }
    } catch (error) {
      toaster.add({
        title: "Ошибка при обновлении события",
        name: "getUpdateError",
        theme: "danger",
        isClosable: true,
        content: (error as any).message,
      });
      console.error("Ошибка при обновлении события:", error);
      setIsEditModalOpen(false);
      handleCloseModal();
    }
  };

  const handleDeleteClick = (incidentId: number) => {
    setDeletingIncidentId(incidentId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingIncidentId !== null) {
      try {
        const result = await deleteIncident(deletingIncidentId).unwrap();

        if (result) {
          socket.emit("incidentDeleted", result.id);

          toaster.add({
            title: "Событие",
            name: "getUpdateError",
            theme: "success",
            isClosable: true,
            content: "Событие удалено успешно",
          });

          setIsDeleteModalOpen(false);
          setDeletingIncidentId(null);
          handleCloseModal();
        }
      } catch (error) {
        toaster.add({
          title: "Ошибка при удалении события",
          name: "getDeleteError",
          theme: "danger",
          isClosable: true,
          content: (error as any).message,
        });
        console.error("Ошибка при удалении события:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingIncidentId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto pr-2">
      <div className="space-y-2">
        {sortIncidents(incidents, sortDesc).map((incident) => (
          <div
            key={incident.id}
            className="p-2 border rounded-lg flex justify-between items-center text-sm sm:text-base"
          >
            <div className="flex items-center gap-2">
              <UserLabel
                type="person"
                avatar={{
                  icon: getStatusIcon(incident.status),
                }}
                size="s"
                description={`${incident.name} ${incident.surname}`}
                text={
                  !incident.isPeriod
                    ? formatDate(incident.date!)
                    : `${formatDate(incident.startDate!)} - ${formatDate(
                        incident.endDate!
                      )}`
                }
                style={{
                  ...getStatusClass(incident.status),
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button view="flat" size="s" onClick={() => handleEdit(incident)}>
                <Icon data={Pencil} />
              </Button>
              <Button
                view="flat"
                size="s"
                onClick={() => handleDeleteClick(incident.id)}
              >
                <Icon data={Xmark} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно редактирования */}
      <IcidentModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleSubmit={handleSubmitEdit}
        title="Редактирование"
        initialData={editingIncident}
      />

      {/* Модальное окно подтверждения удаления */}
      <Modal open={isDeleteModalOpen} onClose={handleCancelDelete}>
        <div className="p-3 w-[90vw] max-w-[400px] flex flex-col gap-4">
          <Text variant="header-2" className="text-center">
            Удаление записи
          </Text>
          <Text className="text-center">
            Вы уверены, что хотите удалить эту запись?
          </Text>
          <div className="flex justify-end gap-2">
            <Button view="normal" onClick={handleCancelDelete}>
              Отмена
            </Button>
            <Button view="action" onClick={handleConfirmDelete}>
              Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
