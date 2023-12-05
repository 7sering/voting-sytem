import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not exist" },
        { status: 404 }
      );
    }

    // Find all related Vote documents
    const votes = await prisma.vote.findMany({
      where: {
        projectId: params.id,
      },
    });

    // Delete all related Vote documents
    for (const vote of votes) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });
    }

    // Delete the Project
    await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
