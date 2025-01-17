'use client'

// third-party
import { useGetTodosQuery } from '@/redux/services/todosApi'

// project-imports
import TodoListComponent from '@/components/todos/TodosList'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setIsError, setLoading, setTodos } from '@/redux/slices/todosSlice'
import { RootState } from '@/redux/store'
import TodoListSkeleton from '@/components/todos/TodoListSkeleton'

// <<===============|| TODOS - PAGE ||===============>>

export default function TodosPage() {
  const dispatch = useDispatch()
  const { data, isLoading: isDataLoading, isError } = useGetTodosQuery()

  useEffect(() => {
    dispatch(setLoading(isDataLoading))
    if (isError) dispatch(setIsError(isError))
    if (data) dispatch(setTodos(data.data))
  }, [data, isDataLoading, isError, dispatch])

  const todos = useSelector((state: RootState) => state.todos.todos)
  const isLoading = useSelector((state: RootState) => state.todos.isLoading)
  return (
    <TodoListSkeleton isLoading={isLoading}>
      <TodoListComponent todos={todos} />
    </TodoListSkeleton>
  )
}
