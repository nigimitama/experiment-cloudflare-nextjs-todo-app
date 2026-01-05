'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { addTodo } from '@/app/actions'

export function TodoForm() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsLoading(true)
    try {
      await addTodo(title)
      setTitle('') // Clear input on success
    } catch (error) {
      console.error('Failed to add todo:', error)
      alert('Failed to add todo. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !title.trim()}>
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
}
