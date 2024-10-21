import { server } from './src/app'
import { PORT } from './src/config/base_config'
import { connectDB } from './src/config/database'

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error.message)
  })
