import { getTodos } from "./actions";
import TodoItem from "@/components/TodoItem";
import TodoForm from "@/components/TodoForm";
import { CheckCircle } from "lucide-react";

export const runtime = "edge";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="max-w-2xl mx-auto px-4 py-20">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-3 bg-blue-500/10 rounded-2xl ring-1 ring-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <CheckCircle className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Focus Today</h1>
          <p className="text-slate-400">Streamline your workflow with style.</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <TodoForm />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between text-sm font-medium text-slate-400 px-1">
            <span>Tasks</span>
            <span>{todos.length} items</span>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl">
                <p className="text-slate-500">No tasks yet. Start by adding one above!</p>
              </div>
            ) : (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
        </section>
      </div>

      <footer className="mt-20 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
        Built with Next.js, Cloudflare D1 & OpenNext
      </footer>
    </main>
  );
}
