import { useEffect } from 'react'

// material-ui
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

// third-party
import toast from 'react-hot-toast'

// project-imports

import Modal from '../Common/Modal'
import { ITodo } from '@/interfaces/todo'
import { IApiError } from '@/interfaces/error'
import { useGetSingleTodoQuery } from '@/redux/services/todosApi'
import { formatDate, formatTime } from '@/utils/date'

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
  task: ITodo | null
}

// <<===============|| TASK DETAILS - MODAL ||===============>>

export default function TaskDetailsModal({ open, setOpen, task }: Props) {
  const { data, isLoading, error } = useGetSingleTodoQuery(task?._id!, {
    skip: !task,
  })

  useEffect(() => {
    if (error) {
      if ((error as IApiError).data?.message) {
        const apiError = (error as IApiError).data.message
        toast.error(apiError)
      } else {
        toast.error('An unexpected error occured.')
      }
      setOpen(false)
    }
  })

  return (
    <Modal open={open} setOpen={setOpen} title="task details">
      <DialogContent>
        {isLoading ? (
          <Stack spacing={2}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={`task-details-skeleton-${idx}`}
                animation="wave"
                variant="text"
                width={200}
              />
            ))}
          </Stack>
        ) : data ? (
          <List>
            <ListItem>Title: {data.title}</ListItem>
            <ListItem>
              Start Date:{' '}
              {`${formatDate(new Date(data.start_date))}, ${formatTime(
                new Date(data.start_date)
              )}`}
            </ListItem>
            <ListItem>
              End Date:{' '}
              {`${formatDate(new Date(data.end_date))}, ${formatTime(
                new Date(data.end_date)
              )}`}
            </ListItem>
            <ListItem>Description: {data.title}</ListItem>
          </List>
        ) : null}
      </DialogContent>
    </Modal>
  )
}
