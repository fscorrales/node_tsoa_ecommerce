import { hash, compare } from 'bcryptjs'
import { SALT_ROUND } from '../config/base_config'

const encrypt = async (pass: string): Promise<string> => {
  const passwordHash = await hash(pass, Number(SALT_ROUND))
  return passwordHash
}

const verified = async (pass: string, passHash: string): Promise<boolean> => {
  const isCorrect = await compare(pass, passHash)
  return isCorrect
}

export { encrypt, verified }
