import { RootState } from "@/app/store/store";
import { IIncident, IIncidentStatus } from "@/app/types/common/i-incident";
import { IPeriod } from "@/app/types/system/i-period";
import { formatDate } from "@/app/utils/formatDate";
import { isIncidentInPeriod } from "@/app/utils/getIsIncidentInPeriod";
import { getStatusClass } from "@/app/utils/getStatusClass";
import { getStatusIcon } from "@/app/utils/getStatusIcon";
import { Pencil, Xmark } from "@gravity-ui/icons";
import { Button, Icon, UserLabel, Modal, Text } from "@gravity-ui/uikit";
import { useState } from "react";
import { useSelector } from "react-redux";
import IcidentModal from "../../IcidentModal";

interface JournalListProps {
  selectedPeriod: IPeriod;
  selectedStatuses: Record<IIncidentStatus, boolean>;
}

export const JournalList = ({
  selectedPeriod,
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

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.userId === Number(user?.id) &&
      isIncidentInPeriod(incident, selectedPeriod) &&
      selectedStatuses[incident.status]
  );

  const handleEdit = (incident: IIncident) => {
    setEditingIncident(incident);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (updatedIncident: IIncident) => {
    console.log("Обновленная запись:", updatedIncident);
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (incidentId: number) => {
    setDeletingIncidentId(incidentId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingIncidentId !== null) {
      console.log("Удаление записи с ID:", deletingIncidentId);

      setIsDeleteModalOpen(false);
      setDeletingIncidentId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingIncidentId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto pr-2">
      <div className="space-y-2">
        {filteredIncidents.map((incident) => (
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
                  incident.date instanceof Date
                    ? formatDate(incident.date)
                    : `${formatDate(incident.date.start)} - ${formatDate(
                        incident.date.end
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
