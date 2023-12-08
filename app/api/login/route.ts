import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// User Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = await loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // find user
    const user = await prisma?.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json("account not found", { status: 404 });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(
      body.password,
      user.hashedPassword!
    );

    if (!isPasswordValid) {
      return NextResponse.json("Invalid password", { status: 401 });
    }

    // Generate a JWT and return it
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
