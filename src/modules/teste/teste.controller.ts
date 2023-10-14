import { Request, Response } from "express";

class TesteController {
  async teste(req: Request, res: Response) {
    return res.status(200).json({
      message: 'Teste!!!!!!!'
    })
  }
}

export default TesteController