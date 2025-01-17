import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { IAddTodoBody } from '@/interfaces/todo'
import { FormikErrors, FormikTouched } from 'formik'
import dayjs from 'dayjs'
import { useTheme } from '@mui/material'

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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
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
                    borderColor: hasError
                      ? theme.palette.error.main
                      : 'inherit',
                  },
                },
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  )
}
