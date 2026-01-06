'use server'

import { revalidatePath } from 'next/cache'
import { getPrismaClient } from '@/lib/db'
import type { Todo } from '@/generated/prisma'

/**
 * Get all todos ordered by creation date (newest first)
 */
export async function getTodos(): Promise<Todo[]> {
  const prisma = await getPrismaClient()

  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return todos
}

/**
 * Add a new todo
 * @param title - The todo title
 */
export async function addTodo(title: string) {
  if (!title.trim()) {
    throw new Error('Title cannot be empty')
  }

  const prisma = await getPrismaClient()

  const todo = await prisma.todo.create({
    data: {
      title: title.trim(),
      completed: false
    }
  })

  revalidatePath('/')
  return todo
}

/**
 * Toggle todo completed status
 * @param id - The todo ID
 */
export async function toggleTodo(id: number) {
  const prisma = await getPrismaClient()

  // Find current todo
  const currentTodo = await prisma.todo.findUnique({
    where: { id }
  })

  if (!currentTodo) {
    throw new Error('Todo not found')
  }

  // Toggle completed status
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      completed: !currentTodo.completed
    }
  })

  revalidatePath('/')
  return updatedTodo
}

/**
 * Delete a todo
 * @param id - The todo ID
 */
export async function deleteTodo(id: number) {
  const prisma = await getPrismaClient()

  await prisma.todo.delete({
    where: { id }
  })

  revalidatePath('/')
}
