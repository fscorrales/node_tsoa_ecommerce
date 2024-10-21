import mongoose from 'mongoose'

type registerRole = 'seller' | 'customer'
type role = registerRole | 'admin'

export interface IBaseUser {
  username: string
  email: string
  image?: string | null
}

export interface ILoginUser {
  username: string
  password: string
}

export interface ICreateUser extends ILoginUser {
  email: string
  role: role
  image?: string | null
}

export interface IRegisterUser extends ICreateUser {
  role: registerRole
}

export interface IUpdateUser {
  username?: string | null
  email?: string | null
  image?: string | null
}

export interface IQueryUser extends IUpdateUser {
  _id?: mongoose.Types.ObjectId
  role?: role
}

export interface IUser extends IBaseUser {
  hash_password: string
  role: role
  deactivated_at?: Date
}

export interface IPublicStoredUser extends IBaseUser {
  _id: mongoose.Types.ObjectId
  role: role
  desactivated_at?: Date
}

export interface IPrivateStoredUser extends IPublicStoredUser {
  hash_password: string
}

interface UserModel extends mongoose.Model<IUser> {
  getDeleted: (queryUser?: IQueryUser) => Promise<IPrivateStoredUser[]>
  getNotDeleted: (queryUser?: IQueryUser) => Promise<IPrivateStoredUser[]>
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer'
  },
  image: {
    type: String,
    required: false
  },
  deactivated_at: {
    type: Date,
    required: false
  }
}, {
  statics: {
    getDeleted: function (queryUser: IQueryUser = {}) {
      return this.find({ deactivated_at: { $ne: null }, ...queryUser }).lean()
    },
    getNotDeleted: function (queryUser: IQueryUser = {}) {
      return this.find({ deactivated_at: { $eq: null }, ...queryUser }).lean()
    }
  },
  versionKey: false,
  strict: true
})

export const Users = mongoose.model<IUser, UserModel>('users', userSchema)
