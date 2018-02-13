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
            message: "New user account is successfully creaed"
          })
    })
  })
}

// Delete a user by admin
exports.delete = (req, res, next) => {
  const { id } = req.query

  // see if the user with given name exists
  User.findByIdAndRemove(id)
    .exec()
    .then(doc => {
      if (!doc)
        return res
          .status(422)
          .send({ error: "Bad request! The user cannot be found" })

      return res
        .status(200)
        .send({ success: "The user account is successfully deleted" })
    })
    .catch(err => next(err))
}
