import { createApp } from './app'
import { serverConfig } from './config'

const app = createApp()

app.listen(serverConfig.port, () => {
  console.log(`API disponível em http://localhost:${serverConfig.port}`)
})
