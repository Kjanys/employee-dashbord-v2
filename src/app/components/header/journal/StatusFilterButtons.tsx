import { DICT_STATUS } from "@/app/consts/journal";
import { IIncidentStatus } from "@/app/types/common/i-incident";
import { Button } from "@gravity-ui/uikit";

interface StatusFilterButtonsProps {
  selectedStatuses: Record<IIncidentStatus, boolean>;
  toggleStatus: (status: IIncidentStatus) => void;
}

export const StatusFilterButtons = ({
  selectedStatuses,
  toggleStatus,
}: StatusFilterButtonsProps) => {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {Object.entries(selectedStatuses).map(([status, isSelected]) => (
        <Button
          key={status}
          view={isSelected ? "normal" : "outlined"}
          onClick={() => toggleStatus(status as IIncidentStatus)}
          style={{
            backgroundColor: isSelected
              ? `var(${DICT_STATUS[status as IIncidentStatus].color})`
              : undefined,
            flex: 1,
          }}
        >
          {DICT_STATUS[status as IIncidentStatus].name}
        </Button>
      ))}
    </div>
  );
};
