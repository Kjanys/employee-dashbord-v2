import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/incidents/delete:
 *   delete:
 *     summary: Удалить событие
 *     description: Удаляет событие по его ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Событие успешно удалено
 *       404:
 *         description: Событие не найдено
 *       500:
 *         description: Ошибка сервера
 */

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
