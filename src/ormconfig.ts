import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const config: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'mediumuser',
	password: '123',
	database: 'mediumclone',
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: true,
}

export default config
