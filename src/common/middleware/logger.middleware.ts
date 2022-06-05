import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { UsersService } from '../../users/users.service'
import { jwtConstants } from '../../auth/constants'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor (private readonly usersService: UsersService) {}

  async use (req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1]
      const decoded: any = jwt.verify(token, jwtConstants.secret)

      const user = await this.usersService.findOne(decoded.username)

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED)
      }

      req.user = user
      next()
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED)
    }
  }
}
