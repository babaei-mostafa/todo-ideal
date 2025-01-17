// material-ui
import DialogContent from '@mui/material/DialogContent'

// third-party
import { Formik } from 'formik'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

// project-impoets
import Modal from '../Common/Modal'
import { RootState } from '@/redux/store'
import CreateTodoForm from './CreateTodoForm'
import { IApiError } from '@/interfaces/error'
import { setTodos } from '@/redux/slices/todosSlice'
import { initialValues } from './constants/initialValues'
import { validationSchema } from './validation/validation'
import { useAddTodoMutation } from '@/redux/services/todosApi'

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
}

// <<===============|| CREATE TASK - MODAL ||===============>>

export default function CreateTaskModal({ open, setOpen }: Props) {
  const dispatch = useDispatch()
  const [createTodo, { isLoading }] = useAddTodoMutation()
  const todos = useSelector((state: RootState) => state.todos.todos)
  return (
    <Modal open={open} setOpen={setOpen} title="create task">
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const addedTodo = await createTodo(values).unwrap()
              const updatedTodos = [...todos, addedTodo.data]
              dispatch(setTodos(updatedTodos))
              setOpen(false)
              toast.success('Task was added succussfully.')
            } catch (error: unknown) {
              if ((error as IApiError).data?.message) {
                const apiError = (error as IApiError).data.message
                toast.error(apiError)
              } else {
                toast.error('An unexpected error occured.')
              }
              setOpen(false)
            }
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            setFieldValue,
            touched,
            errors,
            resetForm,
          }) => (
            <CreateTodoForm
              open={open}
              setOpen={setOpen}
              values={values}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              resetForm={resetForm}
              isLoading={isLoading}
            />
          )}
        </Formik>
      </DialogContent>
    </Modal>
  )
}
