import { useState } from 'react'

// material-ui
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'

// project-imports
import { ITodo } from '@/interfaces/todo'
import { isTody, isTomorrow } from '@/utils/date'
import TaskListPanel from './TaskListPanel'

function a11yProps(index: number) {
  return {
    id: `tasks-tab-${index}`,
    'aria-controls': `tasks-tabpanel-${index}`,
  }
}

interface Props {
  todos: ITodo[] | undefined
}

// <<===============|| TODOS LIST - COMPONENT ||===============>>

export default function TodosListComponent({ todos }: Props) {
  const [value, setValue] = useState(0)

  const todaysTasks = todos
    ? todos.filter((todo) => isTody(todo.start_date))
    : []
  const tomorrowsTasks = todos
    ? todos.filter((todo) => isTomorrow(todo.start_date))
    : []

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container sx={{ display: 'block' }}>
      <Paper sx={{ mt: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Today's Task" {...a11yProps(0)} />
              <Tab label="Tomorrow's Task" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TaskListPanel todos={todaysTasks} value={value} index={0} />
          <TaskListPanel todos={tomorrowsTasks} value={value} index={1} />
        </Box>
      </Paper>
    </Container>
  )
}
