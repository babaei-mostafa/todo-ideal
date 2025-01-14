import { useState } from 'react'

// project-imports
import StyledButton from '../Common/UI/StyledButton'

// <<===============|| CUSTOM TAB PANEL ||===============>>

export default function CreateTask() {
  return (
    <>
      <StyledButton variant="contained">
        <span className="text-xl mr-2">+</span> New Task
      </StyledButton>
    </>
  )
}
