import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";
import { IUserAnswer } from "@/app/types/system/i-user";

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
