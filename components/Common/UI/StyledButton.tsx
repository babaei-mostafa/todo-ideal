// material-ui
import { styled } from '@mui/material'
import Button from '@mui/material/Button'

// <<===============|| STYLED BUTTON ||===============>>

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E1EAF9',
  color: theme.palette.primary.main,
  textTransform: 'capitalize',
    fontWeight: 600,
  fontSize: "1rem"
}))

export default StyledButton
