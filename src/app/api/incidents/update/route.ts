import prisma from "@/app/lib/prisma";
import { getIncident } from "@/app/utils/getIncident";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { id, userId, name, surname, status, date } = await request.json();

    // Проверяем, существует ли событие
    const existingIncident = await prisma.incident.findUnique({
      where: { id },
    });

    if (!existingIncident) {
      return NextResponse.json(
        { message: "Событие не найдено" },
        { status: 404 }
      );
    }

    // Определяем, является ли событие периодом
    const isPeriod = !!date.start; // Если есть date.start, то это период

    // Обновляем событие
    const updatedIncident = await prisma.incident.update({
      where: { id },
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
        message: "Событие успешно обновлено",
        incident: getIncident(updatedIncident),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при обновлении события:", error);
    return NextResponse.json(
      { message: "Ошибка при обновлении события" },
      { status: 500 }
    );
  }
}
