import { body, query } from 'express-validator'
import { validateResult } from './main'
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'

export const validateCreate = [
  body('username')
    .exists().withMessage('Username is required')
    .not().isEmpty().withMessage('Username cannot be empty')
    .isString().withMessage('Username must be a string')
    .escape()
    .trim(), // Sanitize: elimina espacios en blanco,
  body('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid')
    .normalizeEmail(), // Sanitize: normaliza el formato de correo electrónico
  body('password')
    .exists().withMessage('Password is required')
    .not().isEmpty().withMessage('Password cannot be empty'),
  body('role')
    .exists().withMessage('Role is required')
    .isIn(['seller', 'customer', 'admin']).withMessage('Role must be either seller, customer or admin'),
  body('image')
    .optional() // optional field
    .not().isEmpty().withMessage('Image cannot be empty')
    .isString().withMessage('Image must be a string')
    .trim(), // Sanitize: elimina espacios en blanco,
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateUpdate = [
  body('username')
    .optional() // optional field
    .not().isEmpty().withMessage('Username cannot be empty')
    .isString().withMessage('Username must be a string')
    .escape()
    .trim(), // Sanitize: elimina espacios en blanco,
  body('email')
    .optional() // optional field
    .isEmail().withMessage('Email must be valid')
    .normalizeEmail(), // Sanitize: normaliza el formato de correo electrónico
  body('image')
    .optional() // optional field
    .not().isEmpty().withMessage('Image cannot be empty')
    .isString().withMessage('Image must be a string')
    .trim(), // Sanitize: elimina espacios en blanco,
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateQuery = [
  body('username')
    .optional() // optional field
    .not().isEmpty().withMessage('Username cannot be empty')
    .isString().withMessage('Username must be a string')
    .escape()
    .trim(), // Sanitize: elimina espacios en blanco,
  body('role')
    .optional() // optional field
    .isIn(['seller', 'customer', 'admin']).withMessage('Role must be either seller, customer or admin'),
  body('email')
    .optional() // optional field
    .isEmail().withMessage('Email must be valid')
    .normalizeEmail(), // Sanitize: normaliza el formato de correo electrónico
  body('image')
    .optional() // optional field
    .not().isEmpty().withMessage('Image cannot be empty')
    .isString().withMessage('Image must be a string')
    .trim(), // Sanitize: elimina espacios en blanco,
  query('_id')
    .optional() // optional field
    .not().isEmpty().withMessage("User's ID cannot be empty")
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
