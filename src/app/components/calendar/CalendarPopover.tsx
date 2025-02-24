import { IIncident } from "@/app/types/common/i-incident";
import { getStatusClass } from "@/app/utils/getStatusClass";
import { getStatusIcon } from "@/app/utils/getStatusIcon";
import { Button, Popover, UserLabel } from "@gravity-ui/uikit";

interface CalendarPopoverProps {
  popoverDay: number | null;
  day: number;
  invisibleEmployees: IIncident[];
  isMobile: boolean;
  popoverAnchor: HTMLElement | null;
  handleClosePopover: () => void;
  handleOpenPopover: (
    event: React.MouseEvent<HTMLElement>,
    day: number
  ) => void;
}

export const CalendarPopover = ({
  popoverDay,
  day,
  invisibleEmployees,
  isMobile,
  popoverAnchor,
  handleClosePopover,
  handleOpenPopover,
}: CalendarPopoverProps) => {
  return (
    <div className="mt-auto flex justify-center">
      <Popover
        open={popoverDay === day && Boolean(popoverAnchor)}
        onOpenChange={handleClosePopover}
        content={
          <div className="grid grid-cols-2 gap-1 p-1">
            {invisibleEmployees.map((employee) => (
              <UserLabel
                key={employee.id}
                type="person"
                avatar={{
                  icon: getStatusIcon(employee.status),
                }}
                size="m"
                description={employee.name}
                text={employee.name + " " + employee.surname}
                style={{
                  ...getStatusClass(employee.status),
                }}
              />
            ))}
          </div>
        }
      >
        <Button
          view="flat"
          size="m"
          onClick={(e) => (isMobile ? null : handleOpenPopover(e, day))}
        >
          +{invisibleEmployees.length}
        </Button>
      </Popover>
    </div>
  );
};
