const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema

// Define our model
const userSchema = new Schema({
  fullname: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  access: String
})

/**
 * On save hook, encrypt the password
 * before saving a model, run this function
 */
userSchema.pre("save", function(next) {
  const user = this

  // generate a model then run a callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    // hash (encrypt) the password using salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      // overwrite the password with encrypted password
      user.password = hash
      next()
    })
  })
})

// Check password with bcrypt
userSchema.methods.comparePassword = function(userPassword, callback) {
  bcrypt.compare(userPassword, this.password, function(err, res) {
    if (err) return callback(err)

    callback(null, res)
  })
}

// Create the model class
const User = mongoose.model("user", userSchema)

// Export the model
module.exports = User
