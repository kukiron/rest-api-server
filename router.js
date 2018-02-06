const passport = require("passport"),
  Authentication = require("./controllers/authentication"),
  User = require("./models/user")

require("./services/passport")

const requireAuth = passport.authenticate("jwt", { session: false }),
  requireLogin = passport.authenticate("local", { session: false })

module.exports = function(app) {
  // Sample welcome page
  app.get("/", (req, res) => {
    res.send(`
      <div>
        <h4>Hi!  Welcome to the ClayShop API.</h4>
        <div>
          You can see the authorized users' list on <a href="/users">the Users route</a>
        </div>
      </div>
    `)
  })

  // Get the current user's access level
  app.get("/user-access", requireAuth, (req, res) => {
    res.send(req.user.access)
  })

  // Get users list
  app.get("/users", (req, res) => {
    User.find({}, (err, users) => {
      res.send(users)
    })
  })

  // Login & Signup requests
  app.post("/login", requireLogin, Authentication.login)
  app.post("/signup", Authentication.signup)
}
