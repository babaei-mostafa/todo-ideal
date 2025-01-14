// material-ui
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Checkbox from '@mui/material/Checkbox'
import { ITodo } from '@/interfaces/todo'
import { useUpdateTodoMutation } from '@/redux/services/todosApi'

interface Props {
  item: ITodo
  refetch: () => void
}

// <<===============|| CHECK TODO - COMPONENT ||===============>>

export default function CheckTodo({ item, refetch }: Props) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation()

  const handleUpdate = async () => {
    try {
      await updateTodo({
        _id: item._id,
        is_completed: !item.is_completed,
      }).unwrap()
      refetch()
    } catch (error) {
      console.log('Failed to update todo:', error)
    }
  }

  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      onChange={handleUpdate}
      disabled={isLoading}
    />
  )
}
