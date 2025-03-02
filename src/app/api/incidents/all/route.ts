import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { IIncident } from "@/app/types/common/i-incident";

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
        user: true, // Включаем данные пользователя
      },
    });

    const allIncidents: IIncident[] = incidents.map(
      (item) =>
        ({
          id: item.id,
          userId: item.userId,
          name: item.name,
          surname: item.surname,
          status: item.status,
          date: !item.isPeriod
            ? new Date(item.date!)
            : {
                start: new Date(item.startDate!),
                end: new Date(item.endDate!),
              },
        } as IIncident)
    );

    return NextResponse.json(allIncidents, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении событий:", error);
    return NextResponse.json(
      { message: "Ошибка при получении событий" },
      { status: 500 }
    );
  }
}
