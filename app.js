const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const log = require('log-beautify');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const ProjectRequest = require("./models/projectRequest");
const User = require("./models/user");
const Language = require("./models/language");
const ErrorSchema = require("./models/error");
const ErrorType = require("./models/errorType");
const Role = require("./models/role");
const UserRole = require("./models/userRole");

const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");
const authMiddleware = require("./middleware/auth");
const langMiddleware = require("./middleware/injectLang");

app.use(bodyParser.json());
app.use(authMiddleware, langMiddleware);

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolver,
    qraphiql: true,
    customFormatErrorFn(err) {
        if(!err.originalError) {
            return err;
        }

        const message = err.message;
        const status = err.originalError.code;

        return {
            message,
            status,
        };
    }
}));

mongoose
.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.2vwsa.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
)
.then(async () => {

    app.listen(process.env.PORT, () => log.success("Server started."));
    
})
.catch((err) => {
    log.error("Failed to connect to DB");
    log.error(err);
});
