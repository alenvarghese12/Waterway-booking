// require('dotenv').config();
// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const { User } = require("./model/userData");

// // const clientid = process.env.CLIENT_ID; // Use environment variables
// // const clientsecret = process.env.CLIENT_SECRET;

// passport.use(
//   new OAuth2Strategy({
//     clientID: PROCESS.ENV.CLIENT_ID,
//     clientSecret: PROCESS.ENV.CLIENT_SECRET,
//     callbackURL: "/oauth",
//     scope: ["profile", "email"]
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ googleId: profile.id });

//       if (!user) {
//         user = new User({
//           googleId: profile.id,
//           displayName: profile.displayName,
//           email: profile.emails[0].value,
//           image: profile.photos[0].value
//         });

//         await user.save();
//       }

//       return done(null, user);
//     } catch (error) {
//       return done(error, null);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });
