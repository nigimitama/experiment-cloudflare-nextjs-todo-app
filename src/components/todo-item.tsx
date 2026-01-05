'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { toggleTodo, deleteTodo } from '@/app/actions'

interface TodoItemProps {
  id: number
  title: string
  completed: boolean
}

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await toggleTodo(id)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteTodo(id)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-4 flex items-center gap-3">
      <Checkbox
        checked={completed}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        aria-label={`Mark "${title}" as ${completed ? 'incomplete' : 'complete'}`}
      />
      <span
        className={`flex-1 ${completed ? 'line-through text-muted-foreground' : ''}`}
      >
        {title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isLoading}
        aria-label={`Delete "${title}"`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </Card>
  )
}
