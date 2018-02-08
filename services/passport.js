const passport = require("passport"),
  PassportJwt = require("passport-jwt"),
  LocalStrategy = require("passport-local"),
  User = require("../models/user"),
  config = require("../config")

const { Strategy, ExtractJwt } = PassportJwt

// Create local strategy
const localOptions = { usernameField: "email" }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email & password call "done" if the credentials are correct
  User.findOne({ email }, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false)

    // compare password --> is `password` equal to user.password?
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err)

      !isMatch ? done(null, false) : done(null, user)
    })
  })
})

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
}

// Create JWT strategy
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  // If user id in the payload exists in our database call "done" with that user
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false)

    user ? done(null, user) : done(null, false)
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
