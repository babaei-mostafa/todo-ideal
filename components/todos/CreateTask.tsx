import { useState } from 'react'

// project-imports
import StyledButton from '../Common/UI/StyledButton'
import CreateTaskModal from './CreateTaskModal'

// <<===============|| CUSTOM TAB PANEL ||===============>>

export default function CreateTask() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <StyledButton
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ fontSize: { xs: 11, sm: 16, md: 18 } }}
      >
        + New Task
      </StyledButton>
      <CreateTaskModal open={open} setOpen={setOpen} />
    </>
  )
}
