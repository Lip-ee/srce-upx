import * as yup from 'yup'

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('O campo deve ser um e-mail válido.')
    .required('E-mail é um campo obrigatório.'),
  password: yup.string().required('Senha é um campo obrigatório.'),
})

export { LoginSchema }