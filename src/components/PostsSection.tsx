"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PostCard from "@/components/PostCard";

type Post = {
  id: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

type ExternalPost = {
  id?: number;
  username: string;
  created_datetime: string | null;
  title: string;
  content: string;
  author_ip: string;
};

type ExternalApiResponse = {
  results?: ExternalPost[];
} | ExternalPost[];

type Props = {
  userId: string;
  userName: string;
};

export default function PostsSection({ userId, userName }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const [localRes, externalRes] = await Promise.all([
      fetch("/api/posts"),
      fetch("https://dev.codeleap.co.uk/careers/"),
    ]);

    const localData: Post[] = await localRes.json();
    const externalData: ExternalApiResponse = await externalRes.json();

    const rawExternal: ExternalPost[] = Array.isArray(externalData)
      ? externalData
      : (externalData.results ?? []);

    const mappedExternal: Post[] = rawExternal.map((item, index) => ({
      id: item.id ? -item.id : -(index + 1),
      title: item.title,
      content: item.content,
      authorId: "__external__",
      authorName: item.username,
      createdAt: item.created_datetime ?? new Date(0).toISOString(),
    }));

    const combined = [...localData, ...mappedExternal].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setPosts(combined);
  }

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    setSubmitting(false);
    fetchPosts();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  async function handleEdit(id: number, newTitle: string, newContent: string) {
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });
    fetchPosts();
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
      <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-gray-900">What&apos;s on your mind, {userName}?</h2>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim() || submitting}
            className="w-36 rounded-lg bg-[#7695EC] text-white font-bold text-[16px] leading-none tracking-normal hover:bg-[#5a7de8] px-3 py-2 h-auto"
          >
            Create
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={userId}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
