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
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
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
            className="bg-[#7695EC] hover:bg-[#5a7de8]"
          >
            Post
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
