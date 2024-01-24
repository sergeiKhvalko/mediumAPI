import { Module } from '@nestjs/common'
import { UserController } from '@app/user/user.controller'
import { UserSrevice } from '@app/user/user.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserSrevice],
})
export class UserModule {}
