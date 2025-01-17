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
import NoTaskComponent from '../Common/NoTask'
import TaskDetailsModal from './TaskDetailsModal'
import { daysArray, monthsArray } from './constants/daysArray'

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
  const now = new Date()

  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
      <CustomTabPanel value={value} index={index}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 16, md: 18 } }}
            >
              {index === 0
                ? 'Today'
                : index === 1
                ? 'Tomorrow'
                : daysArray[
                    new Date(
                      now.getTime() + index * 24 * 60 * 60 * 1000
                    ).getDay()
                  ]}
              's Task
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
            >
              {`${
                daysArray[
                  new Date(now.getTime() + index * 24 * 60 * 60 * 1000).getDay()
                ]
              }, ${new Date(
                now.getTime() + index * 24 * 60 * 60 * 1000
              ).getDate()} ${
                monthsArray[
                  new Date(
                    now.getTime() + index * 24 * 60 * 60 * 1000
                  ).getMonth()
                ]
              }`}
            </Typography>
          </Stack>
          <CreateTask />
        </Stack>
        <Stack sx={{ py: 2, px: 1 }} spacing={4}>
          {todos && todos?.length ? (
            todos?.map((task) => (
              <TaskCard
                isDetailsModalOpen={isDetailsModalOpen}
                setIsDetailsModalOpen={setIsDetailsModalOpen}
                task={task}
                setSelectedTask={setSelectedTask}
                key={`task-${task._id}`}
              />
            ))
          ) : (
            <NoTaskComponent />
          )}
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
