import { RootState } from "@/app/store/store";
import { IIncidentStatus } from "@/app/types/common/i-incident";
import { IPeriod } from "@/app/types/system/i-period";
import { formatDate } from "@/app/utils/formatDate";
import { isIncidentInPeriod } from "@/app/utils/getIsIncidentInPeriod";
import { getStatusClass } from "@/app/utils/getStatusClass";
import { getStatusIcon } from "@/app/utils/getStatusIcon";
import { Pencil, Xmark } from "@gravity-ui/icons";
import { Button, Icon, UserLabel } from "@gravity-ui/uikit";
import { useSelector } from "react-redux";

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

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.userId === Number(user?.id) &&
      isIncidentInPeriod(incident, selectedPeriod) &&
      selectedStatuses[incident.status]
  );

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
              <Button view="flat" size="s">
                <Icon data={Pencil} />
              </Button>
              <Button view="flat" size="s">
                <Icon data={Xmark} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
