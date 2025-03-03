/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     description: Регистрирует нового пользователя.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistrationPayload'
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Пользователь уже существует
 *       500:
 *         description: Ошибка сервера
 */

export async function POST(request: Request) {
  try {
    const { name, surname, login, email, password } = await request.json();

    // Проверка, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { login },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Пользователь уже существует" },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        login,
        email,
        password: hashedPassword,
      },
    });

    // Возвращаем успешный ответ
    return NextResponse.json(
      { message: "Пользователь успешно зарегистрирован" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return NextResponse.json(
      { message: "Ошибка при регистрации" },
      { status: 500 }
    );
  }
}
