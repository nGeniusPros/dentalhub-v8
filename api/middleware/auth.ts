import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

type JwtPayload = {
  userId: string
  role: 'user' | 'admin'
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  
  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = decoded as JwtPayload
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
