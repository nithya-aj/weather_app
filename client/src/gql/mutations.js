import gql from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
    username
    email
    password
    token
  }
}
`