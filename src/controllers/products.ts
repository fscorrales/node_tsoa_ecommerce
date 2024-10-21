import { Request as ExRequest } from 'express'
import { Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Tags } from 'tsoa'
import { IProduct } from '../models/products'
import { createOne, deleteOne, deleteOneHard, getAll, getAllActive, getAllDeleted, getOne, updateOne } from '../services/products'

@Route('api/products')
@Tags('Products')
export class ProductsController extends Controller {
  @Post()
  public async createOneCtrl (
    @Body() product: IProduct, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const newProduct = await createOne(product)
      response.status(200).send(newProduct)
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
      const products = await getAllActive()
      if (products.length === 0) {
        response.status(404).send('No products found')
      } else {
        response.status(200).json(products)
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
      const products = await getAllDeleted()
      if (products.length === 0) {
        response.status(404).send('No products found')
      } else {
        response.status(200).json(products)
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
      const products = await getAll()
      if (products.length === 0) {
        response.status(404).send('No products found')
      } else {
        response.status(200).json(products)
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
      const product = await getOne(id)
      response.status(200).json(product)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }

  @Put('{id}')
  public async updateOneCtrl (
    @Path() id: string, @Body() product: IProduct, @Request() req: ExRequest
  ): Promise<void> {
    const response = req.res
    if (response == null) {
      throw new Error('Response object is missing')
    }
    try {
      const productUpdated = await updateOne(id, product)
      response.status(200).json(productUpdated)
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
      const productDeleted = await deleteOne(id)
      response.status(200).json(productDeleted)
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
      const productDeleted = await deleteOneHard(id)
      response.status(200).json(productDeleted)
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  }
}
