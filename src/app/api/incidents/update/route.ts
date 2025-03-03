import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/incidents/update:
 *   put:
 *     summary: Обновить событие
 *     description: Обновляет событие по его ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidentUpdatePayload'
 *     responses:
 *       200:
 *         description: Событие успешно обновлено
 *       404:
 *         description: Событие не найдено
 *       500:
 *         description: Ошибка сервера
 */

export async function PUT(request: Request) {
  try {
    const {
      id,
      userId,
      name,
      surname,
      status,
      date,
      isPeriod,
      startDate,
      endDate,
    } = await request.json();

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

    // Обновляем событие
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: {
        userId,
        name,
        surname,
        status,
        isPeriod,
        date: isPeriod ? null : date,
        startDate: isPeriod ? startDate : null,
        endDate: isPeriod ? endDate : null,
      },
    });

    return NextResponse.json(
      {
        message: "Событие успешно обновлено",
        incident: updatedIncident,
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
