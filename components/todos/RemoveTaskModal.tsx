// material-ui
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// third-party
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

// project-imports
import Modal from '../Common/Modal'
import { ITodo } from '@/interfaces/todo'
import { RootState } from '@/redux/store'
import { IApiError } from '@/interfaces/error'
import { setTodos } from '@/redux/slices/todosSlice'
import { useDeleteTodoMutation } from '@/redux/services/todosApi'

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
  task: ITodo
}

// <<===============|| REMOVE TASK - MODAL ||===============>>

export default function RemoveTaskModal({ open, setOpen, task }: Props) {
  const dispatch = useDispatch()
  const [deleteTask, { isLoading }] = useDeleteTodoMutation()
  const todos = useSelector((state: RootState) => state.todos.todos)

  const handleRemove = async () => {
    try {
      await deleteTask(task._id).unwrap()

      const updatedTodos = todos.filter((todo) => todo._id !== task._id)
      dispatch(setTodos(updatedTodos))
      setOpen(false)
      toast.success('Task was removed successfully.')
    } catch (error: unknown) {
      if ((error as IApiError).data?.message) {
        const apiError = error as IApiError
        toast.error(apiError.data.message)
      } else {
        toast.error('An unexpected error occurred.')
      }
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <Modal open={open} setOpen={setOpen} title="confirm task removal">
      <DialogContentText>
        Are you sure you want to remove the task titled "{task.title}"? The
        action cannot be undone.
      </DialogContentText>
      <DialogActions>
        <Button color="error" onClick={handleRemove} disabled={isLoading}>
          Remove
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Modal>
  )
}
