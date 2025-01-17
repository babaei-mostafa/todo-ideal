// material-ui
import { useTheme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// third-party
import dayjs from 'dayjs'
import { FormikErrors, FormikTouched } from 'formik'

// project-imports
import { IAddTodoBody } from '@/interfaces/todo'

interface Props {
  demoLabel: string
  formLabel: string
  values: IAddTodoBody
  touched: FormikTouched<IAddTodoBody>
  errors: FormikErrors<IAddTodoBody>
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<IAddTodoBody>>
}

export default function DateAndTimePicker({
  demoLabel,
  formLabel,
  values,
  errors,
  touched,
  setFieldValue,
}: Props) {
  const theme = useTheme()
  const hasError = Boolean(
    touched[formLabel as keyof IAddTodoBody] &&
      errors[formLabel as keyof IAddTodoBody]
  )

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setFieldValue(formLabel, newValue.toISOString())
    }
  }

  const handleOpen = () => {
    if (!values[formLabel as keyof IAddTodoBody]) {
      const today = dayjs().toISOString()
      setFieldValue(formLabel, today)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateTimePicker']}
        sx={{
          '& .MuiTextField-root': { minWidth: '0 !important' },
          '& input': { fontSize: [13, 13, 16] },
        }}
      >
        <DateTimePicker
          // sx={{"& ."}}
          label={demoLabel}
          value={
            values[formLabel as keyof IAddTodoBody]
              ? dayjs(values[formLabel as keyof IAddTodoBody])
              : null
          }
          onChange={handleChange}
          onOpen={handleOpen}
          slotProps={{
            textField: {
              error: hasError,
              helperText: hasError
                ? errors[formLabel as keyof IAddTodoBody]
                : '',
              InputLabelProps: {
                style: {
                  color: hasError ? theme.palette.error.main : 'inherit',
                },
              },
              inputProps: {
                style: {
                  borderColor: hasError ? theme.palette.error.main : 'inherit',
                },
              },
            },
            popper: {
              sx: {
                '& .MuiPaper-root': {
                  maxHeight: 390,
                  overflowY: 'auto',
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}
