import { Request as ExRequest } from 'express'
import { Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Tags } from 'tsoa'
import { ICreateUser } from '../models/users'
import { createOne, deleteOne, deleteOneHard, getAll, getAllActive, getAllDeleted, getOne, updateOne } from '../services/users'

@Route('api/users')
@Tags('Users')
export class UsersController extends Controller {
  @Post()
  public async createOneCtrl (
    @Body() user: ICreateUser, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const newUser = await createOne(user)
      response.status(200).send(newUser)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Get()
  public async getAllActiveCtrl (@Request() req: ExRequest): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const users = await getAllActive()
      if (users.length === 0) {
        response.status(404).send('No users found')
      } else {
        response.status(200).json(users)
      }
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Get('deleted')
  public async getAllDeletedCtrl (@Request() req: ExRequest): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const users = await getAllDeleted()
      if (users.length === 0) {
        response.status(404).send('No users found')
      } else {
        response.status(200).json(users)
      }
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Get('include_deleted')
  public async getAllCtrl (@Request() req: ExRequest): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const users = await getAll()
      if (users.length === 0) {
        response.status(404).send('No users found')
      } else {
        response.status(200).json(users)
      }
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Get('{id}')
  public async getOneCtrl (
    @Path() id: string, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const user = await getOne(id)
      response.status(200).json(user)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Put('{id}')
  public async updateOneCtrl (
    @Path() id: string, @Body() user: ICreateUser, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const userUpdated = await updateOne(id, user)
      response.status(200).json(userUpdated)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Delete('{id}')
  public async deleteOneCtrl (
    @Path() id: string, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const userDeleted = await deleteOne(id)
      response.status(200).json(userDeleted)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Delete('hard/{id}')
  public async deleteOneHardCtrl (
    @Path() id: string, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const userDeleted = await deleteOneHard(id)
      response.status(200).json(userDeleted)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }
}
