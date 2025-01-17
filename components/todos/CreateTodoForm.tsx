import { useEffect } from 'react'

// material-ui
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'

// third-party
import { FormikErrors, FormikState, FormikTouched } from 'formik'

// project-imports
import { IAddTodoBody } from '@/interfaces/todo'
import DateAndTimePicker from '../Common/DataTimePicker'

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
  values: IAddTodoBody
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<any>) => void
  touched: FormikTouched<IAddTodoBody>
  errors: FormikErrors<IAddTodoBody>
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<IAddTodoBody>>
  resetForm: (
    nextState?: Partial<FormikState<IAddTodoBody>> | undefined
  ) => void
  isLoading: boolean
}

// <<===============|| CREATE TODO FORM - COMPONENT ||===============>>

export default function CreateTodoForm({
  open,
  setOpen,
  values,
  handleChange,
  handleSubmit,
  errors,
  setFieldValue,
  touched,
  resetForm,
  isLoading,
}: Props) {
  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  const handleClickCancel = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            variant="outlined"
            label="Title"
            fullWidth
            name="title"
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            variant="outlined"
            label="description"
            fullWidth
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="enter description"
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </Grid>
        <Grid size={12}>
          <DateAndTimePicker
            demoLabel="Start Date"
            formLabel="start_date"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
        </Grid>
        <Grid size={12}>
          <DateAndTimePicker
            demoLabel="End Date"
            formLabel="end_date"
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
        <Button type="button" onClick={handleClickCancel}>
          Cancel
        </Button>
      </DialogActions>
    </form>
  )
}
