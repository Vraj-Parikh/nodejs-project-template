import app from './app.js'
import envParsed from './constants/env-parsed.js'
import logger from './utils/logger.js'

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
