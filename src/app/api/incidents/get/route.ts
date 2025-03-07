/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/lib/prisma";
import { PeriodName } from "@/app/types/common/i-incident"; // Импортируем enum PeriodName
import { getPeriodFromName } from "@/app/utils/getPeriodFromName";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/incidents/get:
 *   post:
 *     summary: Получить события по фильтрам
 *     description: Возвращает список событий для указанного пользователя, периода и статусов. Если periodName = ALL, возвращает все события.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidentFilterPayload'
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Incident'
 *       500:
 *         description: Ошибка сервера
 */
export async function POST(request: Request) {
  try {
    const { userId, startDate, endDate, statuses, periodName } =
      await request.json();

    const period = getPeriodFromName(periodName, {
      startDate: startDate,
      endDate: endDate,
    });

    // Определяем условия фильтрации
    const whereConditions: any = {
      userId,
      status: {
        in: statuses,
      },
    };

    // Если periodName не равен ALL, добавляем фильтрацию по датам
    if (periodName !== PeriodName.ALL) {
      whereConditions.OR = [
        {
          date: {
            gte: period!.startDate,
            lte: period!.endDate,
          },
        },
        {
          startDate: {
            gte: period!.startDate,
            lte: period!.endDate,
          },
        },
        {
          endDate: {
            gte: period!.startDate,
            lte: period!.endDate,
          },
        },
      ];
    }

    // Получаем события
    const incidents = await prisma.incident.findMany({
      where: whereConditions,
      include: {
        user: true,
      },
    });

    return NextResponse.json(incidents, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении событий:", error);
    return NextResponse.json(
      { message: "Ошибка при получении событий" },
      { status: 500 }
    );
  }
}
