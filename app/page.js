import { connectDB } from "../lib/database.js";
import { Note } from "../lib/models/notes.model.js";
import NewNoteForm from "@/components/NewNoteForm";
import NoteCard from "@/components/NoteCard";

export default async function Home() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 }).lean();

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] bg-size-[22px_22px] text-neutral-900 antialiased">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {/* Header */}
        <header className="relative flex items-end justify-between border-b border-neutral-200 pb-8">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-400">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-400" />
              Journal
            </p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl">
              Notes
              <span className="ml-2 inline-block h-4 w-4 -rotate-12 rounded-[5px] bg-amber-300 align-middle" />
            </h1>
          </div>
          <NewNoteForm />
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between py-6">
          <p className="text-sm text-neutral-400">{notes.length} entries</p>
        </div>

        {/* Notes grid */}
        {notes.length === 0 ? (
          <p className="rounded-3xl border border-neutral-200 bg-white p-12 text-center font-serif text-xl text-neutral-400">
            No notes yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {notes.map((note, i) => (
              <NoteCard
                key={note._id}
                index={i}
                note={{
                  id: note._id.toString(),
                  title: note.title,
                  content: note.content,
                  date: new Date(note.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }),
                }}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8 text-xs text-neutral-400">
          <span>© 2026 Notes</span>
          <span className="uppercase tracking-widest">Written by hand</span>
        </footer>
      </div>
    </main>
  );
}
