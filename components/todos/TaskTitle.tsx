import { useEffect, useState } from 'react'

// material-ui
import Menu from '@mui/material/Menu'
import { useTheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

// project-imports
import { ITodo } from '@/interfaces/todo'
// import TaskDetailsModal from './TaskDetailsModal'
import RemoveTaskModal from './RemoveTaskModal'

interface Props {
  task: ITodo
  isDetailsModalOpen: boolean
  setIsDetailsModalOpen: (state: boolean) => void
  setSelectedTask: (state: ITodo | null) => void
}

// <<===============|| TASK TITLE - COMPONENT ||===============>>

export default function TaskTitle({
  task,
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  setSelectedTask,
}: Props) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleViewClick = () => {
    setIsDetailsModalOpen(true)
    handleClose()
    setSelectedTask(task)
  }

  const handleRemoveClick = () => {
    setIsRemoveModalOpen(true)
    handleClose()
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isMenuOpen])

  return (
    <>
      <Typography
        id="single-task-menu"
        variant="h6"
        component="span"
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          textDecoration: task.is_completed ? 'line-through' : 'none',
        }}
      >
        {task.title}
      </Typography>

      <Menu
        id="single-task-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        disableScrollLock
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={handleViewClick}
          sx={{ textTransform: 'capitalize' }}
        >
          <VisibilityIcon className="mr-1 !text-lg" />
          view details
        </MenuItem>
        <MenuItem
          onClick={handleRemoveClick}
          sx={{ textTransform: 'capitalize', color: theme.palette.error.main }}
        >
          <DeleteIcon className="mr-1 !text-lg" />
          remove
        </MenuItem>
      </Menu>
      <RemoveTaskModal
        open={isRemoveModalOpen}
        setOpen={setIsRemoveModalOpen}
        task={task}
      />
    </>
  )
}
