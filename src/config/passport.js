const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const UsersModel = require('../models/User');

passport.use('local.login', new localStrategy({
   usernameField: 'cedula',
   passwordField: 'password',
   passReqToCallback: true
}, async (req, cedula, password, done) => {
   const user = await UsersModel
      .findOne({
         cedula
      });
   
   if (!user) {
      return done(null, false, { message: 'Usuario y/o contraseña incorrectas...'});
   } else {
      const passLog = await user.verifyPass(password);
      console.log(passLog);

      if (passLog) {
         return done(null, user);
      } else {
         return done(null, false, { message: 'Usuario y/o contraseña incorrectas...'});
      }
   }
}));

passport
   .serializeUser((user, done) => {
      done(null, user.id);
   });

passport
   .deserializeUser(async (id, done) => {
      await UsersModel
         .findById(id, (err, user) => {
            done(err, user);
         })
         .clone();
   });