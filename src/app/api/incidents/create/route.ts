/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/lib/prisma";
import { getIncident } from "@/app/utils/getIncident";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: any) {
  try {
    const { userId, name, surname, status, date } = await request.json();

    // Определяем, является ли событие периодом
    const isPeriod = !!date.start; // Если есть date.start, то это период
    console.log("isPeriod", isPeriod);
    // Создаем новое событие
    const newIncident = await prisma.incident.create({
      data: {
        userId,
        name,
        surname,
        status,
        isPeriod, // Передаем булево значение
        date: isPeriod ? null : date, // Если это период, date = null
        startDate: isPeriod ? date.start : null, // Если это период, startDate = date.start
        endDate: isPeriod ? date.end : null, // Если это период, endDate = date.end
      },
    });

    return NextResponse.json(
      {
        message: "Событие успешно создано",
        incident: getIncident(newIncident),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при создании события:", error);
    return NextResponse.json(
      { message: "Ошибка при создании события" },
      { status: 500 }
    );
  }
}
