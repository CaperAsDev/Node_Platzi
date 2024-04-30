import { GraphQLLocalStrategy } from "graphql-passport";
import AuthService from "../../services/auth.service.js";

const service = new AuthService();

const GQLLocalStrategy = new GraphQLLocalStrategy(
  async(email,password, done)=> {
    try {
      const user = await service.getUser(email, password);
      done(null, user)
    } catch (error) {
      done(error, false);
    }
  }
)

export default GQLLocalStrategy
