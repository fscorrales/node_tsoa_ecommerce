import { body, query } from 'express-validator'
import { validateResult } from './main'
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'

export const validateCreate = [
  body('name')
    .not().isEmpty().withMessage("Product's name cannot be empty")
    .isString().withMessage("Product's name must be a string")
    .escape(),
  body('price')
    .not().isEmpty().withMessage('Price cannot be empty')
    .isNumeric().withMessage('Price must be a number'),
  body('quantity')
    .not().isEmpty().withMessage('Quantity cannot be empty')
    .isNumeric().withMessage('Quantity must be a number'),
  body('description')
    .not().isEmpty().withMessage('Description cannot be empty')
    .isString().withMessage('Description must be a string')
    .escape(),
  body('image')
    .optional() // optional field
    .not().isEmpty().withMessage('Image cannot be empty')
    .isString().withMessage('Image must be a string')
    .trim(), // Sanitize: elimina espacios en blanco,
  body('seller_id')
    .not().isEmpty().withMessage("Seller's ID cannot be empty")
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

export const validateUpdate = [
  body('username')
    .optional() // optional field
    .not().isEmpty().withMessage('Username cannot be empty')
    .isString().withMessage('Image must be a string')
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
  query('name')
    .optional() // optional field
    .not().isEmpty().withMessage("Product's name cannot be empty")
    .isString().withMessage("Product's name must be a string")
    .escape(),
  query('description')
    .optional() // optional field
    .not().isEmpty().withMessage('Description cannot be empty')
    .isString().withMessage('Description must be a string')
    .escape(),
  query('image')
    .optional() // optional field
    .not().isEmpty().withMessage('Image cannot be empty')
    .isString().withMessage('Image must be a string')
    .trim(), // Sanitize: elimina espacios en blanco,
  query('seller_id')
    .optional() // optional field
    .not().isEmpty().withMessage("Seller's ID cannot be empty")
    .custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId')
      }
      return true
    }),
  query('_id')
    .optional() // optional field
    .not().isEmpty().withMessage("Product's ID cannot be empty")
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
