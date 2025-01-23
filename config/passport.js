import { Strategy as jwtStratege } from "passport-jwt";
import { ExtractJwt as ExtractJwt } from "passport-jwt";
import userModel from "../models/Users.js";
// import dotenv from "dotenv";
// dotenv.config();

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSECRETE_KEY;

const passportConfig = (passport) => {
  passport.use(
    new jwtStratege(opts, (jwt_paylod, done) => {
      userModel
        .findById(jwt_paylod.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((error) => console.log(error));
    })
  );
};
export default passportConfig;
