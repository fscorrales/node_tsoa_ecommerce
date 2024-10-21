import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT = 3000,
  SALT_ROUND = 10,
  JWT_SECRET = 'super_secret_key',
  MONGODB_URI = 'mongodb://127.0.0.1:27017/bootcamp_eCommerce_app'
} = process.env
