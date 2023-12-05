import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  info: z.string().min(1, "Info is required"),
  image: z.string().min(1, "Image is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedBody = projectSchema.safeParse(body);

    //if Validation return error message
    if (!validatedBody.success) {
      const error = JSON.parse(validatedBody.error.message);
      return NextResponse.json({ message: error[0].message }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: validatedBody.data.title,
        info: validatedBody.data.info,
        image: validatedBody.data.image,
      },
    });
    return NextResponse.json(
      { message: "Project submitted successfully" },
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

export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        votes: true,
      },
    });

    // Map over the projects to count the votes for each project
    const projectsWithVoteCount = projects.map((project) => {
      return {
        ...project,
        voteCount: project.votes.length,
      };
    });
    return NextResponse.json(
      { projects: projectsWithVoteCount },
      { status: 200 }
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
