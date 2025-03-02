import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

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

    // Удаляем событие
    await prisma.incident.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Событие успешно удалено", id: id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при удалении события:", error);
    return NextResponse.json(
      { message: "Ошибка при удалении события" },
      { status: 500 }
    );
  }
}
