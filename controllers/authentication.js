const jwt = require("jwt-simple"),
  config = require("../config"),
  User = require("../models/user")

const tokenForUser = user => {
  const timestamp = new Date().getTime()
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  )
}

// If user has email & password auth'd we need to give them a token
exports.login = (req, res) => {
  res.send({ token: tokenForUser(req.user) })
}

// Signup new users
exports.signup = (req, res, next) => {
  const { fullname, email, password, access } = req.body

  if (!access)
    return res.status(422).send({ error: "You must provide access priviledge" })

  // see if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err)
    // if so, return error
    if (existingUser) return res.status(422).send({ error: "Email is in use" })

    // if not, create & save user record
    const user = new User({
      fullname,
      email,
      password,
      access
    })

    // respond to request indicating the user was created
    user.save(err => {
      err
        ? next(err)
        : res.json({
            message: "Successfully creaed the new user"
          })
    })
  })
}
