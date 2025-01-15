import { ITodo } from "@/interfaces/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodosState {
  todos: ITodo[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ITodosState = {
  todos: [],
  isLoading: false,
  isError: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { setTodos, setLoading, setIsError } = todoSlice.actions;

export default todoSlice.reducer
