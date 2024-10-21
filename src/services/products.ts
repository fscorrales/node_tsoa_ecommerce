import { IProduct, IQueryProduct, IStoredProduct, Products } from '../models/products'
import { Users } from '../models/users'

// Controlador para crear un nuevo usuario
export const createOne = async (product: IProduct): Promise<IStoredProduct> => {
  const existedUser = await Users.findById(product.seller_id)
  if (existedUser == null) {
    throw new Error('Seller not found by ID')
  }
  console.log(product)
  const newProduct = await Products.create(product)
  return newProduct
}

export const getAllActive = async (queryProduct: IQueryProduct = {}): Promise<IStoredProduct[]> => {
  const products = await Products.getNotDeleted(queryProduct)
  return products
}

export const getAllDeleted = async (queryProduct: IQueryProduct = {}): Promise<IStoredProduct[]> => {
  const products = await Products.getDeleted(queryProduct)
  return products
}

export const getAll = async (queryProduct: IQueryProduct = {}): Promise<IStoredProduct[]> => {
  return await Products.find(queryProduct)
}

export const getOne = async (id: string, populate: boolean = true): Promise<IStoredProduct> => {
  let product = null
  if (populate) {
    product = await Products.findById(id).populate(
      { path: 'seller_id', select: '-hash_password' }
    ).lean()
  } else {
    product = await Products.findById(id)
  }
  if (product == null) {
    throw new Error('Product not found')
  }
  return product
}

export const updateOne = async (id: string, product: IQueryProduct): Promise<IStoredProduct> => {
  const { seller_id: sellerId, ...productWithoutSellerId } = product
  const productUpdated = await Products.findByIdAndUpdate(
    id, productWithoutSellerId, { new: true }
  ).lean()

  if (productUpdated == null) {
    throw new Error('Product not found')
  }
  return productUpdated
}

export const deleteOne = async (id: string): Promise<IStoredProduct> => {
  const productDeleted = await Products.findByIdAndUpdate(
    id, { deactivated_at: Date.now() }, { new: true }
  ).lean()

  if (productDeleted == null) {
    throw new Error('Product not found')
  }
  return productDeleted
}

export const deleteOneHard = async (id: string): Promise<IStoredProduct> => {
  const productDeleted = await Products.findByIdAndDelete(id).lean()

  if (productDeleted == null) {
    throw new Error('Product not found')
  }
  return productDeleted
}
