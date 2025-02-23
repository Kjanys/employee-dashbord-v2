'use client';
import { Sheet, UserLabel } from '@gravity-ui/uikit';
import { IIncident } from '../types/common/i-incident';
import { getStatusClass } from '../utils/getStatusClass';
import { getStatusIcon } from '../utils/getStatusIcon';


interface DaySheetProps {
  day: number;
  month: number;
  year: number;
  employeesInDay: IIncident[];
  visible: boolean;
  onClose: () => void;
}

export default function DaySheet({ day, month, year, employeesInDay, visible, onClose }: DaySheetProps) {
  const formattedDate = new Date(year, month, day).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title={`События за ${formattedDate}`}
      contentClassName="p-4"
    >
      <div className=" grid grid-cols-2 gap-1 mb-2">
        {employeesInDay.map((employee) => (
          <UserLabel
            key={employee.id}
            type="person"
            avatar={{
              icon: getStatusIcon(employee.status),
            }}
            size="m"
            description={employee.name}
            text={`${employee.name} ${employee.surname}`}
            style={{
              ...getStatusClass(employee.status),
            }}
          />
        ))}
      </div>
    </Sheet>
  );
}