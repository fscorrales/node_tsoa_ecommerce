import { Request as ExRequest, Response as ExResponse, NextFunction } from 'express'
import { ValidateError } from 'tsoa'

export const handleHttp = (res: ExResponse, error: string, errorRaw?: any): void => {
  console.log(errorRaw)
  res.status(500)
  res.send({ error })
}

export const tsoaErrorHandler = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields
    })
  }

  if (err instanceof Error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }

  next()
}

export const tsoaNotFoundHandler = (
  _: ExRequest,
  res: ExResponse,
  next: NextFunction): void => {
  res.status(404).send({
    message: 'Not Found'
  })
  next()
}
