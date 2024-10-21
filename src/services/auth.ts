import { ILoginUser, IPrivateStoredUser, IRegisterUser, Users } from '../models/users'
import { verified } from '../security/password'
import { generateToken } from '../security/token'
import { createOne } from './users'

// Controlador para registrarse
export const register = async (user: IRegisterUser): Promise<IPrivateStoredUser> => {
  const newUser = await createOne(user)
  return newUser
}

// Controlador para iniciar sesión (login)
export const login = async (user: ILoginUser): Promise<string> => {
  // Buscar si el usuario con el email proporcionado existe en el arreglo de users
  const existedUser = await Users.findOne({ username: user.username }).lean()

  if (existedUser == null) {
    throw new Error('Usuario no encontrado')
  }
  // Comparar la contraseña recibida sin hashear con la contraseña hasheada almacenada
  const isPasswordMatch = await verified(user.password, existedUser.hash_password)
  if (!isPasswordMatch) {
    throw new Error('Contraseña incorrecta')
  }
  // Crear un token JWT con el id del usuario y el rol
  const token = generateToken(existedUser._id.toString(), existedUser.role)
  // Si todo coincide, retornar el usuario
  return token
}
