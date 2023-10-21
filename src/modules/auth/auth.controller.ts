/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import UserService from '../user/user.service'
import { sign } from 'jsonwebtoken'

class AuthController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const user = await this.userService.findByEmail(email)

      if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: 'Credenciais inválidas.' })

      const newUser = {
        id: user.id,
        email: user.email,
      }

      const token = sign(newUser, String(process.env.SECRET), {
        expiresIn: '7d',
        algorithm: 'HS512',
      })

      return res.status(200).json({
        message: 'Login realizado.',
        user: {
          ...user,
          password: undefined,
        },
        token,
      })
    } catch (e) {
      console.log(e)

      return res
        .status(500)
        .json({ message: 'Erro ao realizar login na aplicação.' })
    }
  }

  async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const user = await this.userService.findByEmail(email)

      if (user)
        return res
          .status(400)
          .json({ message: 'Usuário já existente.' })

      await this.userService.store({
        email,
        password,
      })

      return res.status(201).json({ message: 'Usuário criado com sucesso.' })
    } catch (e) {
      console.log(e)

      return res
        .status(500)
        .json({ message: 'Erro ao realizar login na aplicação.' })
    }
  }
}

export default AuthController