import { ExpressRequest } from '@app/types/expressRequest.interface'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { UserSrevice } from '../user.service'
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserSrevice) {}

	async use(req: ExpressRequest, _: Response, next: NextFunction) {
		if (!req.headers.authorization) {
			req.user = null
			next()
			return
		}

		const token = req.headers.authorization.split(' ')[1]

		try {
			const decode = verify(token, process.env.JWT_SECRET)
			const user = await this.userService.findById(decode.id)
			req.user = user
			next()
		} catch {
			req.user = null
			next()
		}
	}
}
