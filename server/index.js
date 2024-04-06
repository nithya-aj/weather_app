const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

dotenv.config()

// Apollo Server 
const server = new ApolloServer({
    typeDefs,
    resolvers
})
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connection Successful!")
        return server.listen({ port: PORT })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })