import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/incidents/all:
 *   get:
 *     summary: Получить все события за месяц
 *     description: Возвращает список событий за указанный месяц и год.
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Incident'
 *       400:
 *         description: Неверные параметры запроса
 *       500:
 *         description: Ошибка сервера
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) {
      return NextResponse.json(
        { message: "Месяц и год обязательны" },
        { status: 400 }
      );
    }

    // Определяем начало и конец месяца
    const startDate = new Date(Number(year), Number(month), 1);
    const endDate = new Date(Number(year), Number(month) + 1, 1);

    // Получаем события для указанного месяца и года
    const incidents = await prisma.incident.findMany({
      where: {
        OR: [
          {
            date: {
              gte: startDate,
              lt: endDate,
            },
          },
          {
            startDate: {
              gte: startDate,
              lt: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
              lt: endDate,
            },
          },
        ],
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
