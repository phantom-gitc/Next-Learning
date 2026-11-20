"use client";

import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

const TAG_COLORS = [
  "bg-rose-100 text-rose-600",
  "bg-amber-100 text-amber-600",
  "bg-emerald-100 text-emerald-600",
  "bg-sky-100 text-sky-600",
  "bg-violet-100 text-violet-600",
];


// TODO: Add validation for title and content 
// TODO: Add error handling for API calls

export default function NoteCard({ note , index = 0 }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  // TODO: Add tilt animation based on index
  const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";
  
  // TODO: Add tag color based on index
  const tagColor = TAG_COLORS[index % TAG_COLORS.length];


  // TODO: Add error handling for API calls 
  // TODO: Add loading state for delete operation

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/notes/${note.id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };


  // TODO: Add validation for title and content
  // TODO: Add error handling for API calls
  // TODO: Add loading state for update operation

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;


    // TODO: Add loading state for update operation

    setLoading(true);
    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setEditing(false);
      router.refresh();
    }
    setLoading(false);
  };

  // TODO: Add loading state for update operation - show spinner or disabled button
  // TODO: Add validation error messages for empty title or content
  // TODO: Add success message after successful update

  if (editing) {
    return (
      <form
        onSubmit={handleUpdate}
        className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          autoFocus
          className="w-full border-b border-neutral-200 bg-transparent pb-3 font-serif text-2xl outline-none placeholder:text-neutral-300 focus:border-neutral-900"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing…"
          rows={6}
          className="mt-4 w-full resize-none bg-transparent text-sm leading-relaxed text-neutral-700 outline-none placeholder:text-neutral-300"
        />
        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setTitle(note.title);
              setContent(note.content);
            }}
            className="rounded-full px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="rounded-full bg-neutral-900 px-5 py-2 text-sm text-white transition-all hover:scale-105 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <article
      className={`group cursor-pointer rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.02] hover:shadow-lg ${tilt}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] ${tagColor}`}
        >
          Note
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-300">{note.date}</span>
          <div className="flex gap-2 text-xs text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setEditing(true)}
              className="rounded-full px-2 py-1 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="rounded-full px-2 py-1 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <h2 className="mt-6 font-serif text-2xl leading-snug transition-colors group-hover:text-neutral-600">
        {note.title}
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-500">
        {note.content}
      </p>
      <span className="mt-6 inline-block text-xs font-medium text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-neutral-900">
        Read →
      </span>
    </article>
  );
}
