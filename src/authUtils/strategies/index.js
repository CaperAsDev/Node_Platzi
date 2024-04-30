import passport from 'passport';

import LocalStrategy from './local.strategy.js';
import JwtStrategy from './jwt.strategy.js';
import GQLLocalStrategy from './local-gql.strategy.js';

passport.use(LocalStrategy);
passport.use(JwtStrategy);
passport.use(GQLLocalStrategy);
