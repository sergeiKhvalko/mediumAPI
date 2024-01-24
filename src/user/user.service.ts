import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@app/user/dto/createUser.dto'

@Injectable()
export class UserSrevice {
	async createUser(createUserDto: CreateUserDto) {
		return createUserDto
	}
}
