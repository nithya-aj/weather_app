const User = require('../../models/User')
const { ApolloError } = require('./users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            // checking if user already exists or not
            const isUserExists = await User.findOne({ email })
            if (isUserExists) {
                throw new ApolloError("Email already in use", "USER_ALREADY_EXISTS")
            }
            // hashing the password before saving
            var encryptedPass = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                email: email.toLowerCase(),
                password: encryptedPass
            })
            // creating token using jwt
            const token = jwt.sign(
                { user_id: newUser._id, email }, "WRONG_TOKEN",
                {
                    expiresIn: "2h"
                }
            )
            newUser.token = token
            // saving the user to database and returning the response
            const res = await newUser.save()
            return {
                id: res.id,
                ...res._doc
            }
        },
        async loginUser(_, { loginInput: { email, password } }) {
            // checking user exists or not
            const user = await User.findOne({ email })
            if (user && (await bcrypt.compare(password, user.password))) {
                // creating new token
                const token = jwt.sign(
                    { user_id: newUser._id, email }, "WRONG_TOKEN",
                    {
                        expiresIn: "2h"
                    }
                )
                user.token = token
                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID)
    }
}