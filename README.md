# REST API Server for ClayShop

[![Build Status](https://travis-ci.org/kukiron/rest-api-server.svg?branch=github)](https://travis-ci.org/kukiron/rest-api-server) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/ca2077e2db204404af738a55301c8cc6)](https://www.codacy.com/app/kukiron/rest-api-server?utm_source=github.com&utm_medium=referral&utm_content=kukiron/rest-api-server&utm_campaign=Badge_Grade) [![bitHound Dependencies](https://www.bithound.io/github/kukiron/rest-api-server/badges/dependencies.svg)](https://www.bithound.io/github/kukiron/rest-api-server/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/kukiron/rest-api-server/badges/devDependencies.svg)](https://www.bithound.io/github/kukiron/rest-api-server/master/dependencies/npm)

This is the API server providing the endpoint for user authorization of **ClayShop**, a sample smart-lock web interface built with react. Check the demo for the front-end app [here](https://clayshop.herokuapp.com).

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
