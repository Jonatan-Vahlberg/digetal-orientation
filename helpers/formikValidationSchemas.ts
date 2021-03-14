import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('errors.firstName.required'),
  lastName: Yup.string().required('errors.lastName.required'),
  email: Yup.string()
    .email('errors.email.valid')
    .required('errors.email.valid'),
  password: Yup.string()
    .min(8, 'errors.password.valid')
    .required('errors.password.required'),
  confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'errors.password.confirm'
  ),
})

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors.email.valid')
    .required('errors.email.valid'),
  password: Yup.string()
    .min(8, 'errors.password.valid')
    .required('errors.password.required'),
})
