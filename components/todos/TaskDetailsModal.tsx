import { useEffect } from 'react'

// material-ui
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// third-party

// project-imports

import Modal from '../Common/Modal'
import { ITodo } from '@/interfaces/todo'
import { useGetSingleTodoQuery } from '@/redux/services/todosApi'
import { IApiError } from '@/interfaces/error'
import toast from 'react-hot-toast'

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
      <DialogContent sx={{ minWidth: [250, 350, 450, 600] }}>
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
          <Grid container spacing={1}>
            <Grid size={2}>Title:</Grid>
            <Grid size={10} pl={1}>
              {data.title}
            </Grid>
            <Grid size={2}>Start Date:</Grid>
            <Grid size={10} pl={1}>
              {data.start_date}
            </Grid>
            <Grid size={2}>End Date:</Grid>
            <Grid size={10} pl={1}>
              {data.end_date}
            </Grid>
            <Grid size={2}>Description:</Grid>
            <Grid size={10} pl={1}>
              {data.description}
            </Grid>
          </Grid>
        ) : null}
      </DialogContent>
    </Modal>
  )
}
