import { getTodos } from './actions'
import { TodoForm } from '@/components/todo-form'
import { TodoItem } from '@/components/todo-item'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
  const todos = await getTodos()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">My Todos</CardTitle>
            <CardDescription>
              Keep track of your tasks and stay organized
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <TodoForm />

            <div className="space-y-2">
              {todos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No todos yet. Add one above to get started!
                </p>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                  />
                ))
              )}
            </div>

            <div className="pt-4 border-t text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Total: {todos.length}</span>
                <span>Completed: {todos.filter(t => t.completed).length}</span>
                <span>Active: {todos.filter(t => !t.completed).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
