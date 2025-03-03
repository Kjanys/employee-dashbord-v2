/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/incidents/create:
 *   post:
 *     summary: Создать новое событие
 *     description: Создает новое событие.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidentCreatePayload'
 *     responses:
 *       201:
 *         description: Событие успешно создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Incident'
 *       500:
 *         description: Ошибка сервера
 */

export async function POST(request: Request, res: any) {
  try {
    const {
      userId,
      name,
      surname,
      status,
      date,
      isPeriod,
      startDate,
      endDate,
    } = await request.json();

    // Создаем новое событие
    const newIncident = await prisma.incident.create({
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
        message: "Событие успешно создано",
        incident: newIncident,
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
