"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo, Todo } from "@/app/actions";
import { CheckCircle2, Circle, Trash2, Loader2 } from "lucide-react";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all hover:bg-white/10 group">
      <div className="flex items-center gap-3">
        <button
          onClick={() => startTransition(() => toggleTodo(todo.id, !todo.completed))}
          disabled={isPending}
          className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
        >
          {todo.completed ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <span className={`text-lg transition-all ${todo.completed ? "line-through text-slate-500" : "text-slate-100"}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => startTransition(() => deleteTodo(todo.id))}
        disabled={isPending}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all disabled:opacity-50"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
