import {
	Body,
	Controller,
	Post,
	Get,
	Put,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common'
import { UserSrevice } from '@app/user/user.service'
import { CreateUserDto } from '@app/user/dto/createUser.dto'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { LoginUserDto } from './dto/loginUser.dto'
import { UserEntity } from './user.entity'
import { User } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/updateUser.dto'
import { AuthGuard } from './guards/auth.guard'

@Controller()
export class UserController {
	constructor(private readonly userService: UserSrevice) {}

	@Post('users')
	@UsePipes(new ValidationPipe())
	async createUser(
		@Body('user') createUserDto: CreateUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.createUser(createUserDto)
		return this.userService.buildUserResponse(user)
	}

	@Post('users/login')
	@UsePipes(new ValidationPipe())
	async login(
		@Body('user') loginUserDto: LoginUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.login(loginUserDto)
		return this.userService.buildUserResponse(user)
	}

	@Get('user')
	@UseGuards(AuthGuard)
	async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
		return this.userService.buildUserResponse(user)
	}

	@Put('user')
	@UseGuards(AuthGuard)
	async updateCurrentUser(
		@User('id') currentUserId: number,
		@Body('user') updateUserDto: UpdateUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.updateUser(currentUserId, updateUserDto)
		return this.userService.buildUserResponse(user)
	}
}
