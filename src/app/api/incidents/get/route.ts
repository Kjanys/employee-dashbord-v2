import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/incidents/get:
 *   post:
 *     summary: Получить события по фильтрам
 *     description: Возвращает список событий для указанного пользователя, периода и статусов.
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
    const { userId, startDate, endDate, statuses } = await request.json();

    // Получаем события для указанного пользователя, периода и статусов
    const incidents = await prisma.incident.findMany({
      where: {
        userId,
        OR: [
          {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            startDate: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
        status: {
          in: statuses,
        },
      },
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
