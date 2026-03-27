import { serverEnv } from './config/env'

export const serverConfig = {
  port: serverEnv.API_PORT,
  frontendUrl: serverEnv.FRONTEND_URL,
  jwtSecret: serverEnv.JWT_SECRET,
  userDataSource: serverEnv.USER_DATA_SOURCE,
  database: {
    host: serverEnv.DATABASE_HOST,
    port: serverEnv.DATABASE_PORT,
    name: serverEnv.DATABASE_NAME,
    user: serverEnv.DATABASE_USER,
    password: serverEnv.DATABASE_PASSWORD,
    schema: serverEnv.DATABASE_SCHEMA,
    url: serverEnv.DATABASE_URL
  }
}
