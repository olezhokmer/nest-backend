const requestsResolver = require("./resolvers/requests");
const userResolver = require("./resolvers/user");

module.exports = {
    ...requestsResolver,
    ...userResolver,
};