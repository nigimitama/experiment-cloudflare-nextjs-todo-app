"use client";

import { useRef, useTransition } from "react";
import { addTodo } from "@/app/actions";
import { Plus, Loader2 } from "lucide-react";

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    if (!title.trim()) return;

    startTransition(async () => {
      await addTodo(title);
      formRef.current?.reset();
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="relative flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="What needs to be done?"
        required
        disabled={isPending}
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:scale-100 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5 mr-2" /> Add</>}
      </button>
    </form>
  );
}
