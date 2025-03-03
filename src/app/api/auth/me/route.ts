import prisma from "@/app/lib/prisma";
import { IUserAnswer } from "@/app/types/common/i-user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получить информацию о текущем пользователе
 *     description: Возвращает информацию о пользователе по токену.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAnswer'
 *       401:
 *         description: Неверный токен или токен отсутствует
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Токен отсутствует" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      userId: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const newUser: IUserAnswer = {
      ...user,
      token: token,
    };

    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Неверный токен" }, { status: 401 });
  }
}
