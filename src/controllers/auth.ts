import { Request as ExRequest } from 'express'
import { Body, Controller, Post, Request, Route, Tags } from 'tsoa'
import { ILoginUser, IRegisterUser } from '../models/users'
import { login } from '../services/auth'
import { createOne } from '../services/users'

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Post('login')
  public async loginCtrl (
    @Body() user: ILoginUser, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const token = await login(user)
      response
        .cookie('access_token', token,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 // 1 hora
          }
        )
        .send({ message: 'Inicio de sesión exitoso' })
    } catch (err: any) {
      response.status(401).send({ message: err.message })
    }
  }

  @Post('register')
  public async registerCtrl (
    @Body() user: IRegisterUser, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const result = await createOne(user)
      response.send(result)
    } catch (err: any) {
      if (err.message === 'User already exists') {
      // Código 409 (conflict) para usuarios ya registrados
        response.status(409).send('User already exists')
      }
      response.status(500).send('Ocurrió un error inesperado')
    }
  }
}
