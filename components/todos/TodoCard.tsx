import { useState } from 'react'

// material-ui
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// project-imports
import { ITodo } from '@/interfaces/todo'
import CheckTodo from './CheckTodo'

interface Props {
  item: ITodo
  refetchList: () => void
}

// <<===============|| TODO CARD - COMPONENT ||===============>>

export default function TodoCard({ item, refetchList }: Props) {
  return (
    <Paper sx={{ py: 2, px: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{ textDecoration: item.is_completed ? 'line-through' : 'none' }}
          >
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {item.description}
          </Typography>
        </Stack>
        <CheckTodo refetch={refetchList} item={item} />
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
