import { DEFAULT_DAYS_OF_WEEK } from "@/app/consts/calendar";

export const WeekDays = () => {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
      {DEFAULT_DAYS_OF_WEEK.map((day) => (
        <div key={day} className="text-center font-semibold">
          {day}
        </div>
      ))}
    </div>
  );
};
