import { useEffect, useState } from 'react'

// material-ui
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material'
import Container from '@mui/material/Container'

interface Props {
  children?: React.ReactNode
  isLoading: boolean
}

// <<===============|| TODO LIST SKELETON ||===============>>

export default function TodoListSkeleton({ children, isLoading }: Props) {
  const theme = useTheme()
  const [isMounting, setIsMounting] = useState(true)

  useEffect(() => {
    setIsMounting(false)
  }, [])
  return (
    <>
      {isLoading || isMounting ? (
        <Container>
          <Paper sx={{ mt: 4 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ px: 4, pt: 2 }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: [1 / 2, 1 / 2, 1 / 3, 1 / 4] }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: [1 / 2, 1 / 2, 1 / 3, 1 / 4] }}
              />
            </Stack>
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ backgroundColor: theme.palette.secondary.main, p: 4 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Skeleton variant="text" animation="wave" width={100} />
                  <Skeleton variant="text" animation="wave" width={80} />
                </Stack>
                <Skeleton
                  variant="rectangular"
                  height={30}
                  width={100}
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
              </Stack>
              <Stack spacing={3} sx={{ mt: 4 }}>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <Skeleton
                    key={`rectangular-skeleton-${idx}`}
                    variant="rectangular"
                    animation="wave"
                    height={120}
                    width="100%"
                    sx={{ borderRadius: 4 }}
                  />
                ))}
              </Stack>
            </Box>
          </Paper>
        </Container>
      ) : (
        children
      )}
    </>
  )
}
