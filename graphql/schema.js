const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    input RequestInputData {
        firstName: String!
        lastName: String!
        email: String!
        businessRequirements: String!
    }

    input SignUpInputData {
        firstName: String!
        lastName: String!
        email: String!
        pass: String!
    }

    input SignInInputData {
        email: String!
        pass: String!
    }

    type RequestType {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        businessRequirements: String!
        date: String!
        checked: Boolean
    }

    type Token {
        token: String
    }

    type RootQuery {
        getProjectRequests: [RequestType!]!
        login(input: SignInInputData!): Token
    }

    type RootMutation {
        requestProject(input: RequestInputData!): RequestType!
        createUser(input: SignUpInputData!): Token
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);