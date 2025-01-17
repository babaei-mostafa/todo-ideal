import { useState } from 'react'

// material-ui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'

// project-imports
import TaskCard from './TaskCard'
import CreateTask from './CreateTask'
import { ITodo } from '@/interfaces/todo'
import TaskDetailsModal from './TaskDetailsModal'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

// <<===============|| CUSTOM TAB PANEL ||===============>>

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

interface Props {
  todos: ITodo[] | undefined
  value: number
  index: number
}

// <<===============|| TASK LIST PANEL - COMPONENT ||===============>>

export default function TaskListPanel({ todos, value, index }: Props) {
  const theme = useTheme()
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITodo | null>(null)

  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
      <CustomTabPanel value={value} index={index}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Tody's Task
            </Typography>
            <Typography variant="caption">Wednesday, 11 May</Typography>
          </Stack>
          <CreateTask />
        </Stack>
        <Stack sx={{ p: 2 }} spacing={4}>
          {todos && todos?.length
            ? todos?.map((task) => (
                <TaskCard
                  isDetailsModalOpen={isDetailsModalOpen}
                  setIsDetailsModalOpen={setIsDetailsModalOpen}
                  task={task}
                  setSelectedTask={setSelectedTask}
                  key={`task-${task._id}`}
                />
              ))
            : null}
        </Stack>
        <TaskDetailsModal
          open={isDetailsModalOpen}
          setOpen={setIsDetailsModalOpen}
          task={selectedTask}
        />
      </CustomTabPanel>
    </Box>
  )
}
