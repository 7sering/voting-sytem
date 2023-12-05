import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, projectId } = body;

    // console.log("Request body:", body);
    // console.log("User ID:", userId);
    // console.log("Project ID:", projectId);

    //Check if user already voted for this project
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { message: "You have already voted for this project" },
        { status: 400 }
      );
    }

    //if user has not voted then create a new vote
    await prisma.vote.create({
      data: {
        userId: userId,
        projectId: projectId,
      },
    });
    return NextResponse.json(
      { message: "Thanks your vote added to project" },
      { status: 201 }
    );
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
