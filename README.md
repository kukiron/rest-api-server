# REST API Server for ClayShop

This is the API server providing the endpoint for user authorization for
ClayShop.

## Usage

Clone the repo & run the command `cd server && npm install` from
the root directory.

Once the dependencies are installed, run `npm run dev:server` & the app will be served at `localhost:3090`

## Set MongoDB

You need to install & configure [MongoDB](https://docs.mongodb.com/manual/installation/) to run this API server from local machine. After installing, run `mongod` from terminal & edit the `server/index.js` file:

```javascript
// change the following line
mongoose.connect(process.env.MONGODB_URI)

// to the following
mongoose.connect("mongodb://localhost:your-port/db-name")
```

Now you are good to go!
