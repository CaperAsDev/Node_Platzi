import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../../config/config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    return done(error, false);
  }
});

export default JwtStrategy
