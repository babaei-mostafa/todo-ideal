// material-ui
import Checkbox from '@mui/material/Checkbox'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

// third-party
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

// project-imports
import { ITodo } from '@/interfaces/todo'
import { RootState } from '@/redux/store'
import { IApiError } from '@/interfaces/error'
import { setTodos } from '@/redux/slices/todosSlice'
import { useUpdateTodoMutation } from '@/redux/services/todosApi'

interface Props {
  task: ITodo
}

// <<===============|| CHECK TODO - COMPONENT ||===============>>

export default function CheckTodo({ task }: Props) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const handleUpdate = async () => {
    try {
      const updatedTodo = await updateTodo({
        _id: task._id,
        is_completed: !task.is_completed,
      }).unwrap()

      const updatedTodos = todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
      dispatch(setTodos(updatedTodos))
    } catch (error: unknown) {
      if ((error as IApiError).data?.message) {
        const apiError = (error as IApiError).data.message
        toast.error(apiError)
      } else {
        toast.error('An unexpected error occured')
      }
    }
  }

  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      onChange={handleUpdate}
      disabled={isLoading}
      checked={task.is_completed}
    />
  )
}
