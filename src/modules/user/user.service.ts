/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'
import prismaClient from '../../database/index'

class UserService {
  async store(
    data: Pick<User, 'email' | 'password'>,
  ): Promise<User> {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(data.password, salt)

    const user = await prismaClient.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    })

    return user
  }
}

export default UserService