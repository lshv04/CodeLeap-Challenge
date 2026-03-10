"use client";

import { useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { timeAgo } from "@/lib/timeAgo";

type Post = {
  id: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

type Props = {
  post: Post;
  currentUserId: string;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, title: string, content: string) => void;
};

export default function PostCard({ post, currentUserId, onDelete, onEdit }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  const isOwner = post.authorId === currentUserId;

  function handleSave() {
    onEdit(post.id, editTitle, editContent);
    setEditOpen(false);
  }

  async function handleConfirmDelete() {
    setDeleting(true);
    await onDelete(post.id);
    setDeleting(false);
    setDeleteOpen(false);
  }

  return (
    <>
      <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{post.authorName}</span>
              <span className="text-sm text-gray-400">{timeAgo(post.createdAt)}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mt-1">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{post.content}</p>
          </div>
          {isOwner && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditTitle(post.title);
                  setEditContent(post.content);
                  setEditOpen(true);
                }}
                className="text-gray-400 hover:text-[#7695EC] transition-colors"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setDeleteOpen(true)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-sans font-bold text-[22px] leading-none tracking-normal text-black">
              Are you sure you want to delete this item?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-4 pt-2">
            <Button
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
              className="w-36 rounded-lg border border-black bg-white text-black font-sans font-bold text-[16px] leading-none tracking-normal hover:bg-gray-100 px-3 py-2 h-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="w-36 rounded-lg bg-[#FF5151] text-white font-sans font-bold text-[16px] leading-none tracking-normal hover:bg-[#e03e3e] px-3 py-2 h-auto"
            >
              {deleting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Content"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!editTitle.trim() || !editContent.trim()}
              className="bg-[#7695EC] hover:bg-[#5a7de8]"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
