/**
 * @jest-environment node
 */
import { GET, POST } from "./route";
import { NextResponse } from "next/server";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    post: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mock Kinde auth
jest.mock("@kinde-oss/kinde-auth-nextjs/server", () => ({
  getKindeServerSession: jest.fn(),
}));

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockGetKindeServerSession = getKindeServerSession as jest.Mock;

describe("GET /api/posts", () => {
  it("returns all posts ordered by createdAt desc", async () => {
    const fakePosts = [
      { id: 1, title: "Post 1", content: "Content 1", authorId: "u1", authorName: "Alice", createdAt: "2026-03-10T00:00:00.000Z" },
    ];
    (mockPrisma.post.findMany as jest.Mock).mockResolvedValue(fakePosts);

    const res = await GET();
    const body = await res.json();

    expect(mockPrisma.post.findMany).toHaveBeenCalledWith({ orderBy: { createdAt: "desc" } });
    expect(body).toEqual(fakePosts);
  });
});

describe("POST /api/posts", () => {
  it("returns 401 when user is not authenticated", async () => {
    mockGetKindeServerSession.mockReturnValue({
      isAuthenticated: jest.fn().mockResolvedValue(false),
      getUser: jest.fn(),
    });

    const req = new Request("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({ title: "Test", content: "Content" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Unauthorized");
  });

  it("creates a post and returns 201 when authenticated", async () => {
    const fakeUser = { id: "u1", given_name: "Alice", email: "alice@test.com" };
    mockGetKindeServerSession.mockReturnValue({
      isAuthenticated: jest.fn().mockResolvedValue(true),
      getUser: jest.fn().mockResolvedValue(fakeUser),
    });

    const fakePost = { id: 1, title: "Test", content: "Content", authorId: "u1", authorName: "Alice", createdAt: new Date() };
    (mockPrisma.post.create as jest.Mock).mockResolvedValue(fakePost);

    const req = new Request("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({ title: "Test", content: "Content" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.title).toBe("Test");
    expect(body.authorName).toBe("Alice");
  });
});
