# REST API Server for ClayShop

This is the API server providing the endpoint for user authorization for
ClayShop.

## Usage

To use the app clone the repo & run the command `cd server && npm install` from
the root directory.

Once the dependencies are installed, run `npm run dev:server` & the app will be
served on `localhost:3090`

## MongoDB

You need to install & configure MongoDB to run this API server. After
installing, run `mongod` from your terminal change the `server/index.js` file:

```javascript
// change the following line
<Route path="/signup" component={RequireAdmin(Signup)} />

// To the following
<Route path="/signup" component={Signup} />
```

Now you are good to go!
