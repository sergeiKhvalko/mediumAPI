import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from '@app/user/dto/createUser.dto'
import { UserEntity } from '@app/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { UserResponseInterface } from './types/userResponse.interface'
import { LoginUserDto } from './dto/loginUser.dto'
import { compare } from 'bcrypt'

@Injectable()
export class UserSrevice {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const errorResponse = {
			errors: {},
		}

		const userByEmail = await this.userRepository.findOne({
			email: createUserDto.email,
		})

		const userByUsername = await this.userRepository.findOne({
			username: createUserDto.username,
		})

		if (userByEmail) {
			errorResponse.errors['email'] = 'has already been taken'
		}

		if (userByUsername) {
			errorResponse.errors['username'] = 'has already been taken'
		}

		if (userByEmail || userByUsername) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
		}

		const newUser = new UserEntity()
		Object.assign(newUser, createUserDto)
		return await this.userRepository.save(newUser)
	}

	findById(id: number): Promise<UserEntity> {
		return this.userRepository.findOne(id)
	}

	async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
		const errorResponse = {
			errors: {
				'email or password': 'is invalid',
			},
		}
		const user = await this.userRepository.findOne(
			{
				email: loginUserDto.email,
			},
			{ select: ['id', 'username', 'email', 'bio', 'image', 'password'] },
		)

		if (!user) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
		}

		const isPasswordCorrect = await compare(
			loginUserDto.password,
			user.password,
		)

		if (!isPasswordCorrect) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
		}

		delete user.password
		return user
	}

	generateJwt(user: UserEntity): string {
		return sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
			},
			process.env.JWT_SECRET,
		)
	}

	buildUserResponse(user: UserEntity): UserResponseInterface {
		return {
			user: {
				...user,
				token: this.generateJwt(user),
			},
		}
	}
}
