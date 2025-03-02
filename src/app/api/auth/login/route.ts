import prisma from "@/app/lib/prisma";
import { IUserAnswer } from "@/app/types/system/i-user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { login, password } = await request.json();

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 404 }
      );
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Неверный пароль" }, { status: 401 });
    }

    // Генерация токена
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    // отправляем пользователя с токеном
    const newUser: IUserAnswer = {
      ...user,
      token: token,
    };
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return NextResponse.json({ message: "Ошибка при входе" }, { status: 500 });
  }
}
