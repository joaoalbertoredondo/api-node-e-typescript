import { Request, Response } from 'express'
import * as yup from 'yup'

interface ICidade {
  nome: string
  estado: string
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(2),
})

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validateData: ICidade | undefined = undefined

  try {
    validateData = await bodyValidation.validate(req.body, {abortEarly: false})
  } catch (error) {
    const yupError = error as yup.ValidationError
    const errors: Record<string, string> = {}

    yupError.inner.forEach(error => {
      if (error.path === undefined) return
      errors[error.path] = error.message
    })

    return res.status(400).json({errors})
  }

  console.log(validateData)

  return res.send('Create!')
}