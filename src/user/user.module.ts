import { Module } from '@nestjs/common'
import { UserController } from '@app/user/user.controller'
import { UserSrevice } from '@app/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@app/user/user.entity'
import { AuthGuard } from './guards/auth.guard'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserSrevice, AuthGuard],
	exports: [UserSrevice],
})
export class UserModule {}
