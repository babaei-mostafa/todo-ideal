import * as Yup from 'yup'

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required.'),
  description: Yup.string().required('Description is required.'),
  start_date: Yup.string().required('Start date is required.'),
  end_date: Yup.string()
    .required('End date is required')
    .test(
      'is-after-start-date',
      'End date must be later than start date.',
      function (value) {
        const { start_date } = this.parent
        if (!value || !start_date) return true
        return new Date(value) > new Date(start_date)
      }
    ),
})
