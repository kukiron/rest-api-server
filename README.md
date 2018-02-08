# REST API Server for ClayShop

This is the API server providing the endpoint for user authorization of **ClayShop**, a sample smart-lock web interface.

## Usage

To use the application, clone the repo & then:

```shell
> npm install
> npm run dev:server
```

The server will be served at `localhost:3090`.

## Set MongoDB

You need to install & configure [MongoDB](https://docs.mongodb.com/manual/installation/) to run this API server from local machine. After installing, run `mongod` from terminal & edit the `index.js` file:

```javascript
// change the following line
mongoose.connect(process.env.MONGODB_URI)

// to the following
mongoose.connect("mongodb://localhost:your-port/db-name")
```

Now you are good to go!
