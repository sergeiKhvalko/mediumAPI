import { ConnectionOptions } from 'typeorm'
import 'dotenv/config'

const ormconfig: ConnectionOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: false,
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/migrations',
	},
}

export default ormconfig
