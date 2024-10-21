import mongoose from 'mongoose'

export interface IQueryProduct {
  name?: string | null
  description?: string | null
  price?: number
  quantity?: number
  image?: string | null
  seller_id?: mongoose.Types.ObjectId
}

export interface IProduct {
  name: string
  price: number
  quantity: number
  description?: string | null
  image?: string | null
  seller_id: mongoose.Types.ObjectId
  deactivated_at?: Date
}

export interface IStoredProduct extends IProduct {
  _id: mongoose.Types.ObjectId
}

interface ProductModel extends mongoose.Model<IProduct> {
  getDeleted: (queryUser?: IQueryProduct) => Promise<IStoredProduct[]>
  getNotDeleted: (queryUser?: IQueryProduct) => Promise<IStoredProduct[]>
}

const productSchema = new mongoose.Schema<IProduct, ProductModel>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  deactivated_at: {
    type: Date,
    required: false
  }
}, {
  statics: {
    getDeleted: function (queryProduct: IQueryProduct = {}) {
      return this.find({ deactivated_at: { $ne: null }, ...queryProduct }).lean()
    },
    getNotDeleted: function (queryProduct: IQueryProduct = {}) {
      return this.find({ deactivated_at: { $eq: null }, ...queryProduct }).lean()
    }
  },
  versionKey: false,
  strict: true
})

export const Products = mongoose.model<IProduct, ProductModel>('products', productSchema)
