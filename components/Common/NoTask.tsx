// material-ui
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'

// <<===============|| NO TASK - COMPONENT ||===============>>

export default function NoTaskComponent() {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <DoNotDisturbIcon />
      <Typography align="center">No tasks scheduled for this day.</Typography>
    </Stack>
  )
}
