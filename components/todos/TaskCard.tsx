// material-ui
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// project-imports
import { ITodo } from '@/interfaces/todo'
import CheckTodo from './CheckTodo'
import TaskTitle from './TaskTitle'
import { formatTimeRange, isTody, isTomorrow } from '@/utils/date'
import { daysArray } from './constants/daysArray'

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
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack spacing={1}>
          <TaskTitle
            task={task}
            isDetailsModalOpen={isDetailsModalOpen}
            setIsDetailsModalOpen={setIsDetailsModalOpen}
            setSelectedTask={setSelectedTask}
          />
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontSize: { xs: 11, sm: 16, md: 18 } }}
          >
            {task.description}
          </Typography>
        </Stack>
        <CheckTodo task={task} />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {isTody(task.start_date)
            ? 'Today'
            : isTomorrow(task.start_date)
            ? 'Tomorrow'
            : daysArray[new Date(task.start_date).getDay()]}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.5 }}>
          {formatTimeRange(task.start_date, task.end_date)}
        </Typography>
      </Stack>
    </Paper>
  )
}
