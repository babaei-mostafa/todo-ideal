'use client'

// third-party
import { useGetTodosQuery } from '@/redux/services/todosApi'

// project-imports
import TodoListComponent from '@/components/todos/TodosList'

// <<===============|| TODOS - PAGE ||===============>>

export default function TodosPage() {
  const { data, isLoading, isError, refetch } = useGetTodosQuery()
  return <TodoListComponent refetch={refetch} todos={data?.data} />
}
