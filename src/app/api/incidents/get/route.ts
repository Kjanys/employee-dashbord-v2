import prisma from "@/app/lib/prisma";
import { getIncident } from "@/app/utils/getIncident";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, startDate, endDate, statuses } = await request.json();

    // Получаем события для указанного пользователя, периода и статусов
    const incidents = await prisma.incident.findMany({
      where: {
        userId,
        OR: [
          // События, которые начинаются или заканчиваются в указанном периоде
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
          in: statuses, // Фильтр по статусам
        },
      },
      include: {
        user: true, // Включаем данные пользователя
      },
    });

    return NextResponse.json(
      incidents.map((item) => getIncident(item)),
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при получении событий:", error);
    return NextResponse.json(
      { message: "Ошибка при получении событий" },
      { status: 500 }
    );
  }
}
