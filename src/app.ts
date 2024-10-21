import cookieParser from 'cookie-parser'
import express, { Request as ExRequest, Response as ExResponse } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from '../build/routes'
import { tsoaErrorHandler, tsoaNotFoundHandler } from './utils/error_handle'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cookieParser())

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  )
})

RegisterRoutes(app)

app.use(tsoaNotFoundHandler)

app.use(tsoaErrorHandler)

export const server = app
