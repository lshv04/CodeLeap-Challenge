import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser();
  const { title, content } = await req.json();

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user!.id,
      authorName: user!.given_name ?? user!.email ?? "Unknown",
    },
  });

  return NextResponse.json(post, { status: 201 });
}
