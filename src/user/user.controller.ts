import { Body, Controller, Post } from '@nestjs/common'
import { UserSrevice } from '@app/user/user.service'
import { CreateUserDto } from '@app/user/dto/createUser.dto'

@Controller()
export class UserController {
	constructor(private readonly userService: UserSrevice) {}

	@Post('users')
	async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
		return this.userService.createUser(createUserDto)
	}
}
