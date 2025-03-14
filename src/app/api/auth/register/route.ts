/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/app/lib/prisma";
import { IUserAnswer } from "@/app/types/common/i-user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const { name, surname, login, email, password, key } = await request.json();

    // Проверка, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { login },
    });

    const publicKey = process.env.PUBLIC_REGISTRATION_KEY;

    if (key != publicKey) {
      return NextResponse.json({ message: "Неверный ключ" }, { status: 400 });
    }

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

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    const user: IUserAnswer = {
      ...newUser,
      token: token,
    };
    // Возвращаем успешный ответ
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return NextResponse.json(
      { message: "Ошибка при регистрации" },
      { status: 500 }
    );
  }
}
