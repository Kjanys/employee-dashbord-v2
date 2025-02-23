import { IIncidentStatus } from "../types/common/i-incident";

// Вспомогательная функция для получения стилей в зависимости от статуса
export const getStatusClass = (
  status: IIncidentStatus
): React.CSSProperties => {
  switch (status) {
    case IIncidentStatus.REMOTE:
      return {
        background: "var(--g-color-private-blue-450-solid)",
      };
    case IIncidentStatus.SICK:
      return {
        background: "var(--g-color-private-red-450-solid)",
      };
    case IIncidentStatus.VACATION:
      return {
        background: "var(--g-color-private-orange-450-solid)",
      };
    case IIncidentStatus.STUDY:
      return {
        background: "var(--g-color-private-purple-450-solid)",
      };
    case IIncidentStatus.OTHER:
      return {
        background: "var(--g-color-private-green-450-solid)",
      };
    default:
      return {
        background: "var(--g-color-private-green-450-solid)",
      };
  }
};
