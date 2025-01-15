import { ITodo, IUpdateTodoBody } from "@/interfaces/todo";
import api from "./api";
import { IList } from "@/interfaces/list";

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<IList<ITodo>, void>({
      query: (arg: void) => ({
        url: "/todos/fetch/all",
        method: "GET",
      }),
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos/create",
        method: "POST",
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation<ITodo, IUpdateTodoBody>({
      query: (updatedTodo: IUpdateTodoBody) => ({
        url: `/todos/update/${updatedTodo._id}`,
        method: "PUT",
        body: { is_completed: updatedTodo.is_completed },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation } =
  todosApi;
