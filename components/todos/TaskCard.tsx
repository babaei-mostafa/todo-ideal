// material-ui
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// project-imports
import { ITodo } from '@/interfaces/todo'
import CheckTodo from './CheckTodo'
import TaskTitle from './TaskTitle'

interface Props {
  task: ITodo
  isDetailsModalOpen: boolean
  setIsDetailsModalOpen: (state: boolean) => void
  setSelectedTask: (state: ITodo | null) => void
}

// <<===============|| TASK CARD - COMPONENT ||===============>>

export default function TaskCard({
  task,
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  setSelectedTask,
}: Props) {
  return (
    <Paper sx={{ py: 2, px: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1}>
          <TaskTitle
            task={task}
            isDetailsModalOpen={isDetailsModalOpen}
            setIsDetailsModalOpen={setIsDetailsModalOpen}
            setSelectedTask={setSelectedTask}
          />
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {task.description}
          </Typography>
        </Stack>
        <CheckTodo task={task} />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Today
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.5 }}>
          09:15 - 10:00
        </Typography>
      </Stack>
    </Paper>
  )
}
