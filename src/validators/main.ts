import { Request, Response, NextFunction } from 'express'
import { validationResult, param } from 'express-validator'
import { ObjectId } from 'mongodb'

export const validateResult = (
  req: Request, res: Response, next: NextFunction
): void => {
  try {
    validationResult(req).throw()
    next()
  } catch (error: any) {
    res.status(403)
    res.send({ errors: error.array() })
  }
}

export const validateObjectId = [
  param('id')
    .exists().withMessage('ID is required')
    .not().isEmpty().withMessage('ID cannot be empty')
    .custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId')
      }
      return true
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
