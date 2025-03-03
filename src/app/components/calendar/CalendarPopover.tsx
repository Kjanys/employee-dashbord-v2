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
        className="!border-[--g-color-private-blue-350]"
        open={popoverDay === day && Boolean(popoverAnchor)}
        onOpenChange={handleClosePopover}
        content={
          <div className="bg-[--g-color-private-black-400] grid grid-cols-1 gap-1 p-1">
            {invisibleEmployees.map((employee) => (
              <div
                key={employee.id}
                title={employee.name + " " + employee.surname}
              >
                <UserLabel
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
              </div>
            ))}
          </div>
        }
      >
        <Button
          view="flat"
          size={isMobile ? "xs" : "m"}
          onClick={(e) => (isMobile ? null : handleOpenPopover(e, day))}
        >
          +{invisibleEmployees.length}
        </Button>
      </Popover>
    </div>
  );
};
