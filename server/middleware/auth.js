const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        // Bearer...
        const token = authHeader.split('Bearer')[1]
        if (token) {
            try {
                const user = jwt.verify(token, 'WRONG_TOKEN')
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]")
    }
    throw new Error('Authentication header must be provided')
}