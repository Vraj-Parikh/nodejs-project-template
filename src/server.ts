import app from './app'
import envParsed from './constants/env-parsed'
import logger from './utils/logger'

const server = app.listen(envParsed.PORT, '', (error) => {
    if (error) {
        logger.error('Error', error)
        process.exit(1)
    }
})
try {
    // DB Connect
} catch (error) {
    logger.error('Error', error)
    server.close(() => {
        process.exit(1)
    })
}
