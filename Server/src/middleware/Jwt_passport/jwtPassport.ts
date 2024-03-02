require("dotenv").config();
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {User} from '../../models/userschema'; 

const opts: JwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'umeralikhan'
};

passport.use(new JwtStrategy(opts, async (jwt_payload , done) => {
  // console.log(jwt_payload)
  try {
    const user = await User.findById(jwt_payload.id);
    // console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

interface JwtStrategyOptions {
  jwtFromRequest: any; // Adjust the type according to your usage
  secretOrKey: string;
}
