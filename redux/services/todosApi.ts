import {
  IAddTodoBody,
  IAddTodoRes,
  ITodo,
  IUpdateTodoBody,
} from '@/interfaces/todo'
import api from './api'
import { IList } from '@/interfaces/list'

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<IList<ITodo>, void>({
      query: (arg: void) => ({
        url: '/todos/fetch/all',
        method: 'GET',
      }),
    }),
    getSingleTodo: builder.query<ITodo, string>({
      query: (id: string) => ({
        url: `/todos/get/${id}`,
        method: 'GET',
      }),
    }),
    addTodo: builder.mutation<IAddTodoRes, IAddTodoBody>({
      query: (newTodo: IAddTodoBody) => ({
        url: '/todos/create',
        method: 'POST',
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation<ITodo, IUpdateTodoBody>({
      query: (updatedTodo: IUpdateTodoBody) => ({
        url: `/todos/update/${updatedTodo._id}`,
        method: 'PUT',
        body: { is_completed: updatedTodo.is_completed },
      }),
    }),
    deleteTodo: builder.mutation<ITodo, string>({
      query: (todoId: string) => ({
        url: `/todos/delete/${todoId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetSingleTodoQuery,
} = todosApi
