/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'

class Validation {
  validate =
    (schema: any) =>
      async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req

        try {
          await schema.validate(body)
          return next()
        } catch (error) {
          console.log(error)
          return res.status(400).json({ error })
        }
      }
}

export default Validation