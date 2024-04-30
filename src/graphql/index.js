import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { loadFiles } from "@graphql-tools/load-files";
import { buildContext } from "graphql-passport";
import resolvers from "./resolvers/index.js";
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars'

export const useGraphql = async (app) => {
  const typeDefs = [
    ...await loadFiles('./src/**/*.graphql'),
    scalarsTypeDefs
  ]
  const allResolvers = [
    resolvers,
    scalarsResolvers
  ]
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault
    ]
  });
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({req,res}) => buildContext({req,res}),
    }),
  );
}
