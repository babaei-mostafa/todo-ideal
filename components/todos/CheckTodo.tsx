// material-ui
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import { ITodo } from "@/interfaces/todo";
import { useUpdateTodoMutation } from "@/redux/services/todosApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTodos } from "@/redux/slices/todosSlice";

interface Props {
  item: ITodo;
  refetch: () => void;
}

// <<===============|| CHECK TODO - COMPONENT ||===============>>

export default function CheckTodo({ item, refetch }: Props) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      const updatedTodo = await updateTodo({
        _id: item._id,
        is_completed: !item.is_completed,
      }).unwrap();

      const updatedTodos = todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      );
      dispatch(setTodos(updatedTodos));
    } catch (error) {
      console.log("Failed to update todo:", error);
    }
  };

  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      onChange={handleUpdate}
      disabled={isLoading}
      checked={item.is_completed}
    />
  );
}
