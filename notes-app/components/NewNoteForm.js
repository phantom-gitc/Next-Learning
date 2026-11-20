"use client";

import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewNoteForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  const reset = () => {
    setTitle("");
    setContent("");
    setOpen(false);
  };


  // Fetch notes on component mount

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
 
  // Handle form submission 
  // TODO: Add validation for title and content

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // API call to create note 

    setLoading(true);


    // TODO: Add error handling for API call

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        reset();
        router.refresh();
        alert("Note created successfully!");
      }
      
      // TODO: Add error handling for non-200 responses

    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");

      // TODO: Add more specific error handling based on error type

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-neutral-700 hover:shadow-md"
      >
        {open ? "Close" : "+ New note"}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="absolute right-0 top-full z-10 mt-4 w-[28rem] rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl"
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
              onClick={reset}
              className="rounded-full px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {loading ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
