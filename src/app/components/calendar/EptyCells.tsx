import { JSX } from "react";

interface EptyCellsProps {
    daysNumber: number;
}

export const EptyCells = ({ daysNumber }: EptyCellsProps): JSX.Element[] =>  {

  return (
    Array.from({ length: daysNumber }).map((_, index) => (
        <div
          key={`empty-start-${index}`}
          className="p-2 sm:p-4 border rounded-lg text-center dark:border-gray-600 opacity-50"
        />
      ))
  );
}