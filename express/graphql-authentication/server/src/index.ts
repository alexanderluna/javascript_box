import "dotenv/config";
import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolvers";
import { createConnection } from "typeorm";

(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`
            => 🚀 Running on port 4000
            => http://localhost:4000/graphql
        `);
    });
})();
