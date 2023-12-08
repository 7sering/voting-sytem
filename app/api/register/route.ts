import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import bcrypt from "bcrypt";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const user = await prisma?.user.findUnique({
      where: { email: body.email },
    });

    //If user is exist send exist message
    if (user) {
      return NextResponse.json("User already exist", { status: 400 });
    }
    // hashed user password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma?.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword,
      },
    });

    return NextResponse.json("Account Created Successfully", { status: 201 });
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
